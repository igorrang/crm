"use client";
import { Button, Card } from "@radix-ui/themes";
import { useState } from "react";

import { IoMdContact } from "react-icons/io";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

import DialogEditarCliente from "../dialogEditarCliente";
import DadosCliente from "../texts/dadosCliente";


export default function CardDadosCliente() {
  return (
    <div className="w-[350px] lg:ml-32 lg:mr-10 relative border shadow-md rounded-2xl">
        <Card className="w-[350px] flex flex-col ">
          <CardHeader className="w-full bg-primary flex items-center rounded-t-2xl">
            <CardTitle className=""> <IoMdContact className="text-gray-500 text-[90px] "/></CardTitle>
            <div className="ml-2 flex flex-col items-start">
              <CardDescription className=" text-white text-xl">Marcos Miguel Biedermann</CardDescription>
              <DialogEditarCliente></DialogEditarCliente>
            </div>
          </CardHeader>
          <CardContent className="w-full flex flex-col "> 
            <DadosCliente dataInicio="30/05/2024" anuncio="Bio Instagram" observacoes="Sucesso garantido" valorFichas="R$ 1000,00" status="Sucesso" ultimaAtualizacao="30/05/2006"></DadosCliente>
          </CardContent>    
        </Card>
      
    </div>

  );
}