"use client";
import { Button, Card } from "@radix-ui/themes";
import { useState } from "react";

import { IoMdContact } from "react-icons/io";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { PopoverCliente } from "../popoverCliente";


export default function CardDadosCliente() {
  return (
    <div className="w-[350px] lg:ml-32 lg:mr-10 relative border shadow-md rounded-2xl">
      <div className="z-10 w-full h-[130px] top-0 bg-primary rounded-t-2xl absolute "></div>
        <Card className="py-5 w-[350px] flex flex-col ">
          <CardHeader className="z-30  w-full flex flex-col items-center">
            <CardTitle> <IoMdContact className="text-gray-500 text-[150px] "/></CardTitle>
            <CardDescription className="font-black text-black text-2xl">Marcos</CardDescription>
            <CardDescription className="font-black text-black text-xl">Sucesso</CardDescription>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center"> 
            <PopoverCliente ></PopoverCliente>
          </CardContent>    
        </Card>
      
    </div>

  );
}