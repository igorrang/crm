"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMenuOutline } from "react-icons/io5";

import { Button } from "./ui/button";

const Header = ({  }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full py-5 z-50 flex justify-between  items-center bg-primary relative  text-white animate-items-appear">
      <Link href="/" className="ml-[10%] ">
        <Image
          src="/KonvictusLogoEscrita.png"
          alt="logo"
          width={2000}
          height={0}
          className="w-[200px]"
        />
      </Link>
      <nav className="hidden lg:flex  lg:mr-[10%] gap-x-8">
        <Link href="/" className="transition duration-300 hover:text-gray-300">
          Conta
        </Link>
        <Link href="/" className="transition duration-300 hover:text-gray-300">
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
              <Link
                href="/"
                className="transition duration-300 hover:text-gray-300"
              >
                Conta
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="transition duration-300 hover:text-gray-300"
              >
                Sair
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
