
import CardDadosCliente from "@/components/cards/cardDadosCliente";
import CardMensagemHistorico from "@/components/cards/cardMensagemHistorico";

import Header from "@/components/header";
import Navbar from "@/components/narbar";
import TituloSecundario from "@/components/texts/TituloSecundario";
import MensagemHistorico from "@/components/texts/mensagemHistorico";
import TituloPrincipal from "@/components/texts/tituloPrincipal";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";


export default function VerCliente() {
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
            <CardDadosCliente></CardDadosCliente>

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
                <textarea name="" id= "" className=" h-[100px] w-[90%] rounded-2xl border shadow-md overflow-auto"></textarea>
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
