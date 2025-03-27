'use client';

import DialogCadastrarCliente from "@/components/DialogCadastrarCliente";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { DataTable } from "@/components/DataTable";
import { ExcelUpload } from "@/components/ExcelUpload";
import { useState } from 'react';

export default function Planilha() {
  const [data, setData] = useState([]); // Estado para armazenar os dados importados

  const handleDataImport = (importedData) => {
    // Função para lidar com os dados importados
    if (importedData && Array.isArray(importedData)) {
      setData(importedData);
    } else {
      console.error("Dados importados estão em um formato inválido");
    }
  };

  return (
    <main>
      <Header />
      <div className="flex">
        <Navbar />

        <div className="w-full min-h-[94vh] text-black bg-gradient-to-l from-black via-black/90 to-black/85">
          <div className="hidden lg:flex w-full py-4 px-10">
            {/* Espaço para conteúdo adicional, se necessário */}
          </div>
          
          <div className="container mx-auto py-10">
            <DialogCadastrarCliente />
            <ExcelUpload onDataImport={handleDataImport} /> {/* Passa a função para o componente de upload */}
            <DataTable data={data} /> {/* Passa os dados importados para a tabela */}
          </div>
        </div>
      </div>
    </main>
  );
}
