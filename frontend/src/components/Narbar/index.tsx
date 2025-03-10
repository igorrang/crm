
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GiExitDoor } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { Button } from "../ui/button";
import { PiUsersThreeLight, PiTableThin } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineDashboard } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="min-w-[80px] hidden xl:flex flex-col  items-center  bg-gradient-to-t from-black/90 via-black/85 to-black/80 shadow-xl">
      <div className="fixed top-1/2 transform -translate-y-1/2">
        <div className="my-10 flex flex-col items-center justify-center text-white">
          <Link href="/principal" className="flex flex-col items-center">
            <MdOutlineDashboard className="text-[25px]"/>
            <h1 className="text-[12px] text-center">principal</h1>
          </Link>
        </div>
        <div className="my-10 flex flex-col items-center justify-center text-white">
          <Link href="/VerCliente" className="flex flex-col items-center">
            <PiUsersThreeLight className="text-[30px]"/>
            <h1 className="text-[12px] text-center">cliente</h1>
          </Link>
        </div>
        <div className="my-10 flex flex-col items-center justify-center text-white">
          <Link href="/planilha" className="flex flex-col items-center">
            <PiTableThin className="text-[35px]" />
            <h1 className="text-[12px] text-center">planilha</h1>
          </Link>
        </div>
        <div className="my-10 flex flex-col items-center justify-center text-white">
          <Link href="/conta" className="flex flex-col items-center">
            <VscAccount className="text-[25px]"/>
            <h1 className="text-[12px] text-center">conta</h1>
          </Link>
        </div>
        <div className="my-10 flex flex-col items-center justify-center text-white">
          <Link href="/login" className="flex flex-col items-center">
            <GiExitDoor className="text-[28px]" />
            <h1 className="text-[12px] text-center">sair</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
