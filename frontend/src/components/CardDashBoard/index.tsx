"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React from "react";

export interface cardDashBoardProps {
  titulo: string
  valor: string
  urlIcone: string
}

export default function CardDashBoard({titulo, valor, urlIcone}: cardDashBoardProps) {
  return (
    <div className="relative  p-[2px] m-3 rounded-lg bg-gradient-to-tr from-green-400 from-1% via-transparent to-green-400 to-100%">
      <Card className=" flex py-5 bg-secondary border-none bg-gradient-to-bl from-green-400/15 from-0% via-transparent to-transparent to-100%">
        <CardHeader className="w-[30%] flex items-center justify-center p-0 ">
          <img src={urlIcone} alt="" className="w-[50px] "/>
        </CardHeader>
        <CardContent className="w-[70%] flex flex-col justify-center p-0">
          <CardDescription className="text-[14px] text-white">{titulo}</CardDescription>
          <CardTitle className="text-[25px] font-normal text-white">{valor}</CardTitle>
        </CardContent>
      </Card>
    </div>
    
    
  );
}