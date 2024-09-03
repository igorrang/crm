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
    <div className="w-[80px] py-20 hidden lg:flex flex-col items-center shadow-black shadow-xl bg-primary/90 animate-items-appear">
      <div className="my-3 flex flex-col items-center justify-center text-white">
        <Link href="/Planilha" className="flex flex-col items-center">
          <SiMicrosoftexcel className="text-[35px]" />
          <h1 className="text-[10px] font-bold">PLANILHA</h1>
        </Link>
      </div>
      <div className="my-3 flex flex-col items-center justify-center text-white">
        <Link href="/" className="flex flex-col items-center">
          <IoMdContact className="text-[35px]" />
          <h1 className="text-[10px] font-bold">CONTA</h1>
        </Link>
      </div>
      <div className="my-3 flex flex-col items-center justify-center text-white">
        <Link href="/" className="flex flex-col items-center">
          <IoLogOutSharp className="text-[35px]" />
          <h1 className="text-[10px] font-bold">SAIR</h1>
        </Link>
      </div>
    </div>
  );
}
