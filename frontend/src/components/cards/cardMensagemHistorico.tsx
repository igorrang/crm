"use client";
import { useState } from "react";
import { IoMdContact } from "react-icons/io";

import MensagemHistorico from "../texts/mensagemHistorico";
import NomeHistorico from "../texts/nomeHistorico";
import DataHistorico from "../texts/dataHistorico";

export interface cardMensagemHistoricoProps {
  texto: string
  data: string
  horario: string
}

export default function CardMensagemHistorico({texto, data, horario}: cardMensagemHistoricoProps) {
  return (
    <div className="m-4 ">
      <div className="flex items-center">
        <IoMdContact className="text-[60px]"/>
        <div>
        <NomeHistorico texto="Nome do usuário" />
        <DataHistorico texto={`${horario} - ${data}`} />
        </div>

      </div>
      <MensagemHistorico texto={texto} />
    </div>

  );
}