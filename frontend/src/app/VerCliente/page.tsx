'use client'

import Header from "@/components/header";
import Navbar from "@/components/narbar";
import TituloSecundario from "@/components/texts/TituloSecundario";
import CardMensagemHistorico from "@/components/cards/cardMensagemHistorico";

import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CardFiltroCliente from "@/components/cards/cardFiltroCliente";

export default function VerCliente() {
  const [nome, setNome] = useState('')

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
          <div className="flex flex-col items-center lg:flex-row lg:items-start justify-center  py-10">
            {/* Card que tera os dados do cliente */}
            <div className="w-[80%] lg:max-w-[500px] lg:ml-20 lg:mr-5 py-5 px-5 relative border shadow-md rounded-2xl ">
              <form action="" className="flex flex-col items-end">
                <Input placeholder="Filtrar por nome..." value='' className="w-full"/>
                <Button type="submit" className="my-2">Confirmar</Button>
              </form>

              <Button variant='clean' size='clean' className="w-full">
                <CardFiltroCliente nome="Marcos Miguel Biedermann da Silva" dataInicio="2024-05-30" ultimaAtualizacao="2024-08-30" origem="Bio do Instagram" status="Sucesso"/>
              </Button>
            
            </div>

            {/* Historico */}
            <div className="w-full flex flex-col items-center">
              <div className=" w-[80%]">
                <TituloSecundario texto="Histórico" />
              </div>
              <div className="h-[600px] w-[80%] rounded-2xl border shadow-md overflow-auto">
                <CardMensagemHistorico />
                <CardMensagemHistorico />
                <CardMensagemHistorico />
                <CardMensagemHistorico />
              </div>
            
              <div className="w-[80%] mt-3">
                <TituloSecundario texto="Adicione um comentário" />
                <form action="" className="flex justify-between items-end">
                  <textarea name="" id="" className=" h-[100px] w-[90%] rounded-2xl border shadow-md overflow-auto"></textarea>
                  <input type="submit" className=" w-[90px] h-[40px] rounded-xl text-[18px] text-white bg-primary hover:bg-green-600 " />
                </form>
              </div>
            </div>
            
            
          </div>
          
        </div>
      </div>
    </main>
  );
}
