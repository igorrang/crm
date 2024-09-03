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

        <div className="w-full h-[90vh] flex flex-col justify-center items-center text-primary">
          <div className="flex flex-col lg:flex-row">
            <Link href="/" className="">
              <IoMdContact className="text-[300px]" />
            </Link>
            <Link href="/Planilha" className="">
              <SiMicrosoftexcel className="text-[300px]" />
            </Link>
            <Link href="/" className="">
              <IoMdContact className="text-[300px]" />
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row">
            <Link href="/" className="">
              <IoMdContact className="text-[300px]" />
            </Link>
            <Link href="/" className="">
              <IoMdContact className="text-[300px]" />
            </Link>
            <Link href="/" className="">
              <IoMdContact className="text-[300px]" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
