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

        <div className="w-full min-h-[94vh] px-5 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl text-gray-700 font-semibold leading-none tracking-tight">Controle de leads</h1>
          <div className="w-full flex flex-wrap items-center justify-center lg:justify-start">
            <CardDashBoard titulo="Total de leads" valor="200"></CardDashBoard>
            <CardDashBoard titulo="Nunca respondeu" valor="50"></CardDashBoard>
            <CardDashBoard titulo="Primeiro contato" valor="150"></CardDashBoard>
            <CardDashBoard titulo="Cadastrou-se" valor="100"></CardDashBoard>
            <CardDashBoard titulo="Carregou fichas" valor="80"></CardDashBoard>
          </div>
        </div>
      </div>
    </main>
  );
}
