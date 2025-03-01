"use client";

import DialogCadastrarCliente from "@/components/dialogCadastrarCliete/dialogCadastrarCliente";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Narbar/Narbar";
import { DataTable } from "@/components/DataTable/DataTable";
import { ExcelUpload } from "@/components/ExcelUpload/ExcelUpload";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";


export default function Planilha() {
  return (
    <main>
      <Header></Header>
      <div className="flex">
        <Navbar></Navbar>

        <div className="w-full min-h-[94vh]  text-black bg-gradient-to-l from-black via-black/90 to-black/85 ">
          <div className="hidden lg:flex w-full py-4 px-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/Planilha">Planilha</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
