'use client'
import { IoSend } from "react-icons/io5";

import Header from "@/components/header";
import Navbar from "@/components/narbar";
import TituloSecundario from "@/components/texts/TituloSecundario";
import CardMensagemHistorico from "@/components/cards/cardMensagemHistorico";

import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import CardFiltroCliente from "@/components/cards/cardFiltroCliente";
import axios from "axios";


interface Item {
    id_cliente: number,
    dataInicio: string,
    nome: string,
    origem: string,
    observacao: string,
    valorFicha: string,
    status: string,
    ultimaAtualizacao: string
}

interface Historico {
    id_historico: number,
    mensagem: string,
    data: string,
    horario: string,
    id_cliente: number,
}

export default function VerCliente() {
  const [data, setData] = useState<Item[]>([]);
  const [dataHistorico, setDataHistorico] = useState<Historico[]>([])
  const [nome, setNome] = useState('')
  // useState para fazer a parte de cadastrar uma mensagemHistorico funcionar
  const [mensagemIdCliente, setMensagemIdCliente] = useState<number>(0)
  const [mensagemHistorico, setMensagemHistorico] = useState('')
  
  const endOfMessagesRef = useRef(null);

  
  useEffect(() => {
    // Verifica se o elemento de referência existe e rola até ele
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dataHistorico]); // Atualiza sempre que dataHistorico mudar

  // Função que realizará o filtro de Clientes 
  const filtrarCliente = async () => {
    const res = await axios.post("/api/filtroVerCliente", {nome});
    setData(res.data) 
  };
  // Função que será executada quando o cliente clicar no usuario desejado. Passará o id para realizar a query e colocará os valores da query em um useState<recebe um items array> para 
  // Rodar uma map nesse useState e imprimir as observacoes do cliente
  const exibirHistoricoCliente = async (id: number): Promise<void> => {
    const res = await axios.get(`/api/historico?id_cliente=${id}`)    
    setDataHistorico(res.data)
  }
  // Metodo para cadastrar o historico que o cliente esta inserindo
  const inserindoHistorico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/historico", {mensagemHistorico, mensagemIdCliente});
        // Verifique se a requisição foi bem-sucedida
        if (res.status === 200) {
          // Usar router.push para redirecionar e recarregar a página
          

        } else {
          console.error('Erro ao cadastrar cliente:', res.statusText);
        }
    } catch (error) {
      console.error('Error posting client data:', error);
    }
  };

  return (
    <main>
      <Header></Header>
      <div className="flex">
        <Navbar></Navbar>

        <div className="w-full text-black ">
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
          <div className="flex flex-col items-center lg:flex-row lg:items-start justify-start  py-10">
            {/* Card que tera os dados do cliente */}
            <div className="w-[80%] max-w-[500px] lg:ml-20 lg:mr-5 py-5 px-5 relative border shadow-md rounded-2xl ">
              <Input placeholder="Filtrar por nome..." value={nome} onChange={(e) => {setNome(e.target.value)}} className="w-full"/>
              <Button type="submit" className="my-2" onClick={filtrarCliente}>Confirmar</Button>
              
              {data.map((item) => {
                return (
                  <div >
                    <Button onClick={() => {
                      exibirHistoricoCliente(item.id_cliente) 
                      setMensagemIdCliente(item.id_cliente) // Passando o id do cliente para utilizar quando for inserir um novo historico
                    }} variant='clean' size='clean' className="w-full">
                      <CardFiltroCliente nome={item.nome} dataInicio={item.dataInicio} ultimaAtualizacao={item.ultimaAtualizacao} origem={item.origem} status={item.status} />
                    </Button>
                  </div>
                )
              })}
            </div>

            {/* Historico */}        
                <div className="w-full flex flex-col items-center">
                  <div className="w-[80%] p-5 rounded-2xl border shadow-md">
                    <div  className="h-[500px]  overflow-auto ">
                    {dataHistorico.map((item) => {
                      return (
                        <div >
                          <CardMensagemHistorico texto={item.mensagem} data={item.data} horario={item.horario}/>
                        </div>
                      )
                      })}
                       <div ref={endOfMessagesRef} />
                    </div>
                    <div className="mt-3">
                      <form onSubmit={inserindoHistorico} className="flex justify-around items-end">
                        <textarea value={mensagemHistorico} onChange={(e) => setMensagemHistorico(e.target.value)} required placeholder="Digite algum comentário" className=" min-h-[40px] w-[90%] mr-1 py-2 px-3 text-sm border shadow-md overflow-auto"></textarea>
                        <Button ><IoSend /> </Button>
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
