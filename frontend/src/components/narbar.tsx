"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoLogOutSharp } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { Button } from "./ui/button";
import { SiMicrosoftexcel } from "react-icons/si";

export default function Navbar() {
  return (
    <div className="w-[110px] h-[600px] my-20 mx-4 px-5 rounded-[100px] hidden lg:flex flex-col justify-center items-center bg-primary/90 shadow-xl">
      <div className="my-3 flex flex-col items-center justify-center text-white">
        <Link href="/VerCliente" className="flex flex-col items-center">
          <img src="/verCliente.png" alt="" className="w-[70px]"/>
          <h1 className="text-[15px] font-bold text-center">VER CLIENTE</h1>
        </Link>
      </div>
      <div className="my-3 flex flex-col items-center justify-center text-white">
        <Link href="/Planilha" className="flex flex-col items-center">
          <img src="/Planilha.png" alt="" className="w-[70px]"/>
          <h1 className="text-[15px] font-bold text-center">PLANILHA</h1>
        </Link>
      </div>
      <div className="my-3 flex flex-col items-center justify-center text-white">
        <Link href="/Conta" className="flex flex-col items-center">
          
          <img src="/contaUsuario.png" alt="" className="w-[65px]"/>
          <h1 className="text-[15px] font-bold text-center">CONTA</h1>
        </Link>
      </div>
      <div className="my-3 flex flex-col items-center justify-center text-white">
        <Link href="/" className="flex flex-col items-center">
          <IoLogOutSharp className="text-[60px]" />
          <h1 className="text-[15px] font-bold text-center">SAIR</h1>
        </Link>
      </div>
    </div>
  );
}
