'use client'

import DialogCadastrarCliente from "@/components/DialogCadastrarCliente";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar"; // Corrigido aqui
import { DataTable } from "@/components/DataTable";
import { ExcelUpload } from "@/components/ExcelUpload";

export default function Planilha() {
  return (
    <main>
      <Header />
      <div className="flex">
        <Navbar />

        <div className="w-full min-h-[94vh] text-black bg-gradient-to-l from-black via-black/90 to-black/85">
          <div className="hidden lg:flex w-full py-4 px-10">
            {/* Pode adicionar Breadcrumbs ou outras informações aqui */}
          </div>
          
          <div className="container mx-auto py-10">
            <DialogCadastrarCliente />
            <ExcelUpload />
            <DataTable />
          </div>
        </div>
      </div>
    </main>
  );
}
