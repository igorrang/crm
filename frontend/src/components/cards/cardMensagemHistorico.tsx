"use client";
import { useState } from "react";
import { IoMdContact } from "react-icons/io";

import MensagemHistorico from "../texts/mensagemHistorico";
import NomeHistorico from "../texts/nomeHistorico";
import DataHistorico from "../texts/dataHistorico";

export interface cardMensagemHistoricoProps {
  texto: string
}

export default function CardMensagemHistorico({texto}: cardMensagemHistoricoProps) {
  return (
    <div className="m-4 ">
      <div className="flex items-center">
        <IoMdContact className="text-[60px]"/>
        <div>
        <NomeHistorico texto="Marcos" />
        <DataHistorico texto="12:00 05/08/2024" />
        </div>

      </div>
      <MensagemHistorico texto="texto" />
    </div>

  );
}