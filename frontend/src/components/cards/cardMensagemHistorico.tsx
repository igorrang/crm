"use client";
import { useState } from "react";
import { IoMdContact } from "react-icons/io";

import MensagemHistorico from "../texts/mensagemHistorico";
import NomeHistorico from "../texts/nomeHistorico";
import DataHistorico from "../texts/dataHistorico";
export default function CardMensagemHistorico() {
  return (
    <div className="m-4 ">
      <div className="flex items-center">
        <IoMdContact className="text-[60px]"/>
        <div>
        <NomeHistorico texto="Marcos" />
        <DataHistorico texto="12:00 05/08/2024" />
        </div>

      </div>
      <MensagemHistorico texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.." />
    </div>

  );
}