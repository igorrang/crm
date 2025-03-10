'use client'
import { useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import { IoMenuOutline, IoLogOutSharp} from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { PiTableThin, PiUsersThreeLight } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import { GiExitDoor } from "react-icons/gi";

const Header = ({  }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full py-3 z-50 flex justify-between items-center bg-gradient-to-l from-black/90 via-black/85 to-black/80 relative  text-white animate-items-appear">
      

      <IoMenuOutline
        className="xl:hidden cursor-pointer mr-[10%] text-[30px] color-white "
        onClick={() => setMenuOpen(!menuOpen)}
      />
      {menuOpen && (
        <div className="xl:hidden  absolute top-full left-0 w-full bg-primary p-4 rounded-b-2xl  shadow-md ">
          <div className="flex flex-col gap-y-2 ">
            <Link href="/Principal" className="flex justify-between items-center my-2">
              Principal
              <MdOutlineDashboard className="text-[28px]"/>
            </Link>
            <Link href="/VerCliente" className="flex justify-between items-center my-2">
              Cliente
              <PiUsersThreeLight className="text-[28px]"/>
            </Link>
          
            <Link href="/Planilha" className="flex justify-between items-center my-2">
              Planilha
              <PiTableThin className="text-[30px]" />
            </Link>
          
            <Link href="/Conta" className="flex justify-between items-center my-2">
              Conta
              <VscAccount className="text-[25px]"/>
            </Link>
          
            <Link href="/" className="flex justify-between items-center my-2">
              Sair
              <GiExitDoor className="text-[28px]" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
