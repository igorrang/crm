'use client';

import { IoSend } from "react-icons/io5";
import Header from "@/components/header";
import Navbar from "@/components/narbar";
import CardMensagemHistorico from "@/components/cards/cardMensagemHistorico";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import CardFiltroCliente from "@/components/cards/cardFiltroCliente";
import axios from "axios";

interface Item {
  id_cliente: number;
  dataInicio: string;
  nome: string;
  origem: string;
  observacao: string;
  valorFicha: string;
  status: string;
  ultimaAtualizacao: string;
}

interface Historico {
  id_historico: number;
  mensagem: string;
  data: string;
  horario: string;
  id_cliente: number;
}

export default function VerCliente() {
  const [data, setData] = useState<Item[]>([]);
  const [dataHistorico, setDataHistorico] = useState<Historico[]>([]);
  const [nome, setNome] = useState('');
  const [mensagemIdCliente, setMensagemIdCliente] = useState<number>(0);
  const [mensagemHistorico, setMensagemHistorico] = useState('');

  const containerRef = useRef<HTMLDivElement | null>(null); // Referência para o container

  useEffect(() => {
    // Rolar automaticamente para o fim do container ao carregar
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [dataHistorico]); // Executa sempre que dataHistorico for atualizado

  // Função para filtrar clientes
  const filtrarCliente = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/filtroVerCliente", { nome });
      setData(res.data);
    } catch (error) {
      console.error('Erro ao filtrar clientes:', error);
    }
  };

  // Função para exibir o histórico do cliente selecionado
  const exibirHistoricoCliente = async (id: number) => {
    try {
      const res = await axios.get(`/api/historico?id_cliente=${id}`);
      setDataHistorico(res.data);
    } catch (error) {
      console.error('Erro ao exibir histórico:', error);
    }
  };

  // Função para inserir um novo histórico
  const inserindoHistorico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/historico", { mensagemHistorico, mensagemIdCliente });
      if (res.status === 200) {
        setMensagemHistorico('');
        exibirHistoricoCliente(mensagemIdCliente); // Atualiza o histórico
      } else {
        console.error('Erro ao cadastrar histórico:', res.statusText);
      }
    } catch (error) {
      console.error('Erro ao inserir histórico:', error);
    }
  };

  return (
    <main>
      <Header />
      <div className="flex">
        <Navbar />

        <div className="w-full text-black">
          <div className="hidden lg:flex w-full py-4 px-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/Principal">Principal</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/Planilha">Planilha</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/VerCliente">Ver Cliente</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Container principal */}
          <div className="flex flex-col items-center lg:flex-row lg:items-start justify-start py-10">
            {/* Card com os dados do cliente */}
            <div className="w-[80%] max-w-[500px]   lg:ml-20 lg:mr-5 py-5  relative border shadow-md rounded-l-2xl">
              <form onSubmit={filtrarCliente} className="flex flex-col items-end px-5">
                <Input placeholder="Filtrar por nome..." value={nome} onChange={(e) => setNome(e.target.value)} className="w-full" required/>
                <Button type="submit" className="my-2" >Confirmar</Button>
              </form>
              
              <div className="h-[443px] overflow-auto pl-5 mt-3" >
              {data.map((item) => (
                <div key={item.id_cliente} >
                  <Button
                    onClick={() => {
                      exibirHistoricoCliente(item.id_cliente);
                      setMensagemIdCliente(item.id_cliente); // Define o id do cliente
                    }}
                    variant="clean"
                    size="clean"
                    className="w-full"
                  >
                    <CardFiltroCliente
                      nome={item.nome}
                      dataInicio={item.dataInicio}
                      ultimaAtualizacao={item.ultimaAtualizacao}
                      origem={item.origem}
                      status={item.status}
                    />
                  </Button>
                </div>
              ))}
              </div>
             
            </div>

            {/* Histórico */}
            <div className="w-full flex flex-col items-center">
              <div className="w-full mr-10 p-5 pt-0 rounded-r-2xl border shadow-md">
                <div ref={containerRef} className="h-[500px] overflow-auto">
                  {dataHistorico.map((item) => (
                    <div key={item.id_historico}>
                      <CardMensagemHistorico texto={item.mensagem} data={item.data} horario={item.horario} />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <form onSubmit={inserindoHistorico} className="flex justify-around items-end">
                    <textarea
                      value={mensagemHistorico}
                      onChange={(e) => setMensagemHistorico(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault(); // Evita a quebra de linha
                          inserindoHistorico(e); // Chama a função de submit
                        }
                      }}
                      required
                      placeholder="Digite algum comentário"
                      className="min-h-[40px] w-[90%] mr-1 py-2 px-3 text-sm border shadow-md overflow-auto"
                    />
                    <Button type="submit"><IoSend /></Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
