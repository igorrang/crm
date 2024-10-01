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
      <div className="flex">
        <Navbar></Navbar>

        <div className="w-full h-[90.3vh] flex flex-col justify-center items-center text-primary">
          <div className="flex flex-col md:flex-row">
            <Link href="/VerCliente" className="">
              <img src="/verCliente.png" alt="" className="w-[222px] mx-10 my-5"/>
            </Link>
            <Link href="/Planilha" className="">
              <img src="/Planilha.png" alt="" className="w-[240px] mx-10 my-5"/>
            </Link>
            <Link href="/Conta" className="">
              <img src="/contaUsuario.png" alt="" className="w-[230px] mx-10 my-5"/>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
