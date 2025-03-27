"use client";

import Link from "next/link";
import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import CardFiltroCliente from "@/components/CardFiltroCliente";
import CardMensagemHistorico from "@/components/CardMensagemHistorico";
import Header from "@/components/Header";
import Narbar from "@/components/Narbar";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import React from "react";
import { Item, Historico, Deposito } from "@/models/types/userTypes";

export default function VerCliente() {
@@ -28,18 +27,15 @@ export default function VerCliente() {
      <div className="flex">
        <Navbar />
        <div className="w-full min-h-[94vh] text-black bg-gradient-to-l from-black via-black/90 to-black/85">
          {/* Adicionando Suspense para evitar erro com useSearchParams */}
          <Suspense fallback={<p>Carregando...</p>}>
            <PageContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}


function PageContent() {
  const searchParams = useSearchParams(); // ✅ Agora está dentro de um Client Component com Suspense
  const [data, setData] = useState<Item[]>([]);
  const [dataHistorico, setDataHistorico] = useState<Historico[]>([]);
  const [dataDeposito, setDeposito] = useState<Deposito[]>([]);
  const [dataDepositoEscolhido, setDepositoEscolhido] = useState<Deposito[]>([]);
  const [nomeOrNickname, setNomeOrNickname] = useState("");
  const [mensagemIdCliente, setMensagemIdCliente] = useState<number>(0);
  const [mensagemHistorico, setMensagemHistorico] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
       containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [dataHistorico]);

  const filtrarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/filtroVerCliente", { nomeOrNickname });
      setData(res.data);
    } catch (error) {
      console.error("Erro ao filtrar clientes:", error);
    }
  };

  const exibirHistoricoCliente = async (id: number) => {
    try {
      const res = await axios.get(`/api/historico?id_cliente=${id}`);
      setDataHistorico(res.data);
    } catch (error) {
      console.error("Erro ao exibir histórico:", error);
    }
  };

  const inserindoHistorico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/historico", {
        mensagemHistorico,
        mensagemIdCliente,
      });
      if (res.status === 200) {
        setMensagemHistorico("");
        exibirHistoricoCliente(mensagemIdCliente);
      } else {
        console.error("Erro ao cadastrar histórico:", res.statusText);
      }
    } catch (error) {
      console.error("Erro ao inserir historico:", error);
    }
  };

  const res = await axios.get(`/api/filtrarDeposito?id_cliente=${id}`);
      setDeposito(res.data);
    } catch (error) {
      console.error("Erro ao exibir depósitos:", error);
    }
  };

  const exibirDepositosCliente = async (id: number) => {
    try {
      const res = await axios.get(`/api/deposito?id_deposito=${id}`);
      setDepositoEscolhido(res.data);
    } catch (error) {
      console.error("Erro ao exibir depósitos:", error);
    }
  };

  return (
    <>
      <div className="hidden lg:flex w-full py-4 px-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/principal">Principal</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/vercliente">Ver Cliente</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-start py-10 lg:px-20">
        <div className="w-[90%] max-w-[650px] lg:max-w-[500px] py-5 relative bg-secondary border border-white/70 shadow-md rounded-2xl lg:rounded-r-none">
          <form onSubmit={filtrarCliente} className="flex flex-col items-end px-5">
            <Input
              placeholder="Filtrar por nome ou nickname"
              value={nomeOrNickname}
              onChange={(e) => setNomeOrNickname(e.target.value)}
              className="w-full"
              required
            />
            <Button type="submit" className="my-2">
              Confirmar
            </Button>
          </form>

          <div className="h-[443px] overflow-auto px-4 mt-3">
            {data.map((item) => (
              <div key={item.id_cliente}>
                <Button
                  variant="clean"
                  size="clean"
                  className="w-full"
                  onClick={() => {
                    exibirHistoricoCliente(item.id_cliente);
                    setMensagemIdCliente(item.id_cliente);
                    filtrarDepositos(item.id_cliente);
                  }}
                >
                  <CardFiltroCliente
                    nome={item.nome}
                    nickname={item.nickname}
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

        <div className="w-[90%] max-w-[1000px] flex flex-col items-center lg:mr-5 mt-5 lg:mt-0">
          <div className="bg-secondary w-full p-5 pt-0 rounded-2xl lg:rounded-l-none border border-white/70 shadow-md">
            <div ref={containerRef} className="h-[501px] overflow-auto">
              {dataHistorico.map((item) => (
                <div key={item.id_historico}>
                  <CardMensagemHistorico
                    texto={item.mensagem}
                    data={item.data}
                    horario={item.horario}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <form onSubmit={inserindoHistorico} className="flex justify-around items-end">
                <textarea
                  value={mensagemHistorico}
                  onChange={(e) => setMensagemHistorico(e.target.value)}
                  required
                  placeholder="Digite algum comentário"
                  className="min-h-[40px] w-[90%] mr-1 py-2 px-3 text-sm border shadow-md bg-primary placeholder:text-gray-300 text-white"
                />
                <Button type="submit">
                  <IoSend />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
