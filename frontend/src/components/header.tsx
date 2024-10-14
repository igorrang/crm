"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMenuOutline, IoLogOutSharp } from "react-icons/io5";

import { Button } from "./ui/button";

const Header = ({  }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full py-3 z-50 flex justify-between items-center bg-gradient-to-l from-black/90 via-black/85 to-black/80 relative  text-white animate-items-appear">
      <Link href="/Principal" className="ml-[10%] ">
        <Image
          src="/KonvictusLogoEscrita.png"
          alt="logo"
          width={2000}
          height={0}
          className="w-[200px]"
        />
      </Link>
      <nav className="hidden lg:flex  lg:mr-[10%] gap-x-8">
        <Link href="/Conta" className="">
          Conta
        </Link>
        <Link href="/" className="">
          Sair
        </Link>
      </nav>

      <IoMenuOutline
        className="lg:hidden cursor-pointer mr-[10%] text-[30px] color-white "
        onClick={() => setMenuOpen(!menuOpen)}
      />
      {menuOpen && (
        <div className="lg:hidden  absolute top-full left-0 w-full bg-primary p-4 rounded-b-2xl  shadow-md ">
          <ul className="flex flex-col gap-y-2 ">
            <li>
              <Link href="/VerCliente" className="flex justify-between items-center my-2">
                Ver Cliente
                <img src="/verCliente.png" alt="" className="w-[30px]"/>
              </Link>
            </li>
            <li>
              <Link href="/Planilha" className="flex justify-between items-center my-2">
                Planilha
                <img src="/Planilha.png" alt="" className="w-[30px]"/>
              </Link>
            </li>
            <li>
              <Link href="/Conta" className="flex justify-between items-center my-2">
                Conta
                <img src="/contaUsuario.png" alt="" className="w-[30px]"/>
              </Link>
            </li>
            <li>
              <Link href="/" className="flex justify-between items-center my-2">
                Sair
                <IoLogOutSharp  className="text-[30px]" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
