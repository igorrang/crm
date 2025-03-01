"use client";
import { useState } from "react";
import { IoMdContact } from "react-icons/io";

import MensagemHistorico from "../MensagemHistorico";


import React from "react";

export interface cardMensagemHistoricoProps {
  texto: string
  data: string
  horario: string
}

export default function CardMensagemHistorico({texto, data, horario}: cardMensagemHistoricoProps) {
  return (
    <div className="m-4 flex">
      
      <IoMdContact className="text-[50px] text-white"/>
      <div className="max-w-[80%] bg-primary/60 border shadow-md rounded-xl py-2 px-2 ml-1 ">
        
       
        <MensagemHistorico texto={texto} />
      </div>        
    </div>

  );
}