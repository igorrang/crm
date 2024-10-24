'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";

import CardFiltroCliente from "@/components/cards/cardFiltroCliente";
import CardMensagemHistorico from "@/components/cards/cardMensagemHistorico";
import Header from "@/components/header";
import Navbar from "@/components/narbar";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import CardFiltroAnexo from "@/components/cards/cardFiltroAnexo";
import DialogEditarFichas from "@/components/dialogs/dialogEditarFichas";
import DescricaoDeposito from "@/components/descricaoDeposito";

interface Item {
  id_cliente: number;
  dataInicio: string;
  nome: string;
  origem: string;
  nickname: string;
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

interface Deposito {
  id_deposito: number;
  data: string;
  hora: string;
  valorReais: string;
  valorFichas: string;
  id_cliente: number;
}

export default function VerCliente() {
  const [data, setData] = useState<Item[]>([]); //Recebe os dados referente ao filtro de cliente
  const [dataHistorico, setDataHistorico] = useState<Historico[]>([]);
  const [dataDeposito, setDeposito] = useState<Deposito[]>([]);
  const [dataDepositoEscolhido, setDepositoEscolhido] = useState<Deposito[]>([]);
  const [nomeOrNickname, setNomeOrNickname] = useState('');
  
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
      const res = await axios.post("/api/filtroVerCliente", { nomeOrNickname});
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

   // Função para exibir o histórico do cliente selecionado
   const filtrarDepositos = async (id: number) => {
    try {
      const res = await axios.get(`/api/filtrarDeposito?id_cliente=${id}`);
      console.log(res.data);
      
      setDeposito(res.data);
    } catch (error) {
      console.error('Erro ao exibir histórico:', error);
    }
  };

  // Função para exibir o histórico do cliente selecionado
  const exibirDepositosCliente = async (id: number) => {
    try {
      console.log('1 ok');
      
      const res = await axios.get(`/api/deposito?id_deposito=${id}`);
      setDepositoEscolhido(res.data);
    } catch (error) {
      console.error('Erro ao exibir histórico:', error);
    }
  };

  return (
    <main>
      <Header />
      <div className="flex">
        <Navbar />

        <div className="w-full min-h-[94vh] text-black bg-gradient-to-l from-black via-black/90 to-black/85">
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
                    <Link href="/VerCliente">Ver Cliente</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Container principal */}
          <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-start py-10 lg:px-20">
          
            {/* Card com os dados do cliente */}
            <div className="w-[90%] max-w-[650px] lg:max-w-[500px] relative bg-secondary border border-white/70 shadow-md rounded-2xl lg:rounded-r-none">
             <h1 className="mt-3 mb-2 px-5 text-white">Filtrar clientes</h1>
              <form onSubmit={filtrarCliente} className="flex flex-col items-end px-5">
                <Input placeholder="Filtrar por nome ou nickname" value={nomeOrNickname} onChange={(e) => setNomeOrNickname(e.target.value)} className="w-full" required/>
                <Button type="submit" className="my-2" >Confirmar</Button>
              </form>
              
              <div className={`h-[483px] overflow-auto px-4 mt-3 ${data.length <= 0 ? 'flex justify-center items-center' : ''}`}>
                {data.length > 0 ? (
                  data.map((item) => (
                    <div key={item.id_cliente}>
                      <Button variant="clean" size="clean" className="w-full" onClick={() => { exibirHistoricoCliente(item.id_cliente); setMensagemIdCliente(item.id_cliente); filtrarDepositos(item.id_cliente); }}>
                        <CardFiltroCliente nome={item.nome} nickname={item.nickname} dataInicio={item.dataInicio} ultimaAtualizacao={item.ultimaAtualizacao} origem={item.origem} status={item.status} />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-white/80 mb-[197px]">Nenhum cliente encontrado</p>
                )}
              </div>
            </div>

            {/* Histórico */}
            <div className=" w-[90%] max-w-[1000px] flex flex-col items-center lg:mr-5 mt-5 lg:mt-0">
              
              <div className=" bg-secondary w-full  p-5 pt-0 rounded-2xl lg:rounded-l-none border border-white/70 shadow-md">
                <h1 className="mt-3 mb-2 text-white">Histórico do cliente</h1>
                <div ref={containerRef} className={`h-[501px] overflow-auto ${dataHistorico.length <= 0 ? 'flex justify-center items-center' : ''}`}>
                  {dataHistorico.length > 0 ? (
                    dataHistorico.map((item) => (
                      <div key={item.id_historico}>
                        <CardMensagemHistorico texto={item.mensagem} data={item.data} horario={item.horario} />
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-sm text-white/80 ">Nenhum histórico encontrado</p>
                  )
                }
                </div>
                <div className="mt-3 ">
                  <form onSubmit={inserindoHistorico} className=" flex justify-around items-end">
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
                      className="min-h-[40px] w-[90%] mr-1 py-2 px-3 text-sm border shadow-md overflow-auto bg-primary placeholder:text-gray-300 text-white"
                    />
                    <Button type="submit"><IoSend /></Button>
                  </form>
                </div>
              </div>
            </div>
          </div>


          {/* Parte inferior onde mostrara os anexos */}
          <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-start py-10 lg:px-20">
          
            {/* Card com os dados do cliente */}
            <div className="w-[90%] max-w-[650px] lg:max-w-[500px] relative bg-secondary border border-white/70 shadow-md rounded-2xl lg:rounded-r-none">
              <h1 className="mt-3 mb-2 px-5 text-white">Histórico depósitos</h1>
              
              
              <div className={`h-[483px] overflow-auto px-4 mt-3 ${dataDeposito.length <= 0 ? 'flex justify-center items-center' : ''}`}>
              {dataDeposito.length > 0 ? (
                  dataDeposito.map((item) => (
                    <Button variant="clean" size="clean" className="w-full" onClick={() => {exibirDepositosCliente(item.id_deposito)}}>
                      <CardFiltroAnexo data={item.data} hora={item.hora} valorFichas={item.valorFichas} valorReais={item.valorReais} anexo=""/>
                    </Button>
                  ))
                ) : (
                  <p className="text-center text-sm text-white/80 ">Nenhum depósito encontrado</p>
                )}
              </div>
            </div>

            {/* detalhes do deposito */}
            
            <div className={`bg-secondary  w-[90%] max-w-[500px] h-[533px] lg:mr-5  mt-5 lg:mt-0 lg:mr-5 p-5 rounded-2xl lg:rounded-l-none border border-white/70 shadow-md  ${dataDeposito.length <= 0 ? 'flex justify-center items-center' : ''}`}>
              {dataDeposito.length > 0 ? (
                dataDepositoEscolhido.map((item) => (
                  <DescricaoDeposito data={item.data} hora={item.hora} valorFichas={item.valorFichas} valorReais={item.valorReais}></DescricaoDeposito>
                  
                ))
              ) : (
                <p className="text-center text-sm text-white/80 mt-[45px]">Nenhum detalhe de depósito encontrado</p>
              )}


            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
