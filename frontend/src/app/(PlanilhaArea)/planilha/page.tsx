'use client'

import DialogCadastrarCliente from "@/components/DialogCadastrarCliente";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { DataTable } from "@/components/DataTable";
import { ExcelUpload } from "@/components/ExcelUpload";

export default function Planilha() {
  return (
    <main>
      <Header></Header>
      <div className="flex">
        <Navbar></Navbar>

        <div className="w-full min-h-[94vh] text-black bg-gradient-to-l from-black via-black/90 to-black/85">
          <div className="hidden lg:flex w-full py-4 px-10">
          
          </div>
          
          <div className="container mx-auto py-10">
            <DialogCadastrarCliente></DialogCadastrarCliente>
            <ExcelUpload />
            <DataTable></DataTable>
          </div>
        </div>
      </div>
    </main>
  );
}
