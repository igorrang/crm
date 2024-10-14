import CardDashBoard from "@/components/cards/cardDashBoard";
import Header from "@/components/header";
import Navbar from "@/components/narbar";
import Image from "next/image";
import Link from "next/link";
import { IoMdContact } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";

export default function Index() {
  return (
    <main>
      <Header></Header>
      <div className="flex ">
        <Navbar></Navbar>

        <div className="w-full min-h-[94vh] p-1 flex flex-col items-start lg:items-start bg-gradient-to-l from-black via-black/90 to-black/85">
          <div className="m-3">
            <p className="text-white text-[13px]">Bem-vindo ao seu</p>
            <div className="flex">  
              <p className="text-green-400 font-semibold text-[16px]">Dashboard</p>
              <p className="text-white text-[16px]"> Konvictus</p>
            </div>
          </div>

          {/* Container controle de leads */}
          <div className="w-full">
            <h1 className="text-[20px] m-3 mb-0 text-white leading-none tracking-tight">Controle de leads</h1>
            <div className="w-full grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
              <CardDashBoard titulo="Total de leads" valor="200" urlIcone="/totalleads.png"/>
              <CardDashBoard titulo="Nunca respondeu" valor="50" urlIcone="/clientenaorespondeu.png"/>
              <CardDashBoard titulo="Primeiro contato" valor="150" urlIcone="/primeriocontato.png"/>
              <CardDashBoard titulo="Cadastrou-se" valor="100" urlIcone="/cadastrou.png"/>
              <CardDashBoard titulo="Carregou fichas" valor="80" urlIcone="/carregoufichasDois.png"/>
              <CardDashBoard titulo="Desistiram" valor="10" urlIcone="/desistiram.png"/>
            </div>
          </div>
          
          {/* Container controle de clientes */}
          <div className="w-full mt-10">
            <h1 className="text-[20px] m-3 mb-0 text-white leading-none tracking-tight">Controle de clientes</h1>
            <div className="w-full grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
              <CardDashBoard titulo="Total de vendas" valor="200" urlIcone="/totalvendas.png"/>
              <CardDashBoard titulo="Ticket médio" valor="50" urlIcone="/ticketmedio.png"/>
              <CardDashBoard titulo="Faturamento" valor="150" urlIcone="/faturamento.png"/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
