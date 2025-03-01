'use client';
import React from "react";

 // Garante que o componente seja renderizado no cliente

export interface cardFiltroClienteProps {
  nome: string;
  nickname: string;
  dataInicio: string;
  ultimaAtualizacao: string;
  origem: string;
  status: string;
}

export default function CardFiltroCliente({ nome, nickname, dataInicio, origem, status, ultimaAtualizacao }: cardFiltroClienteProps) {
  return (
    <div className="w-full  mx-2 px-2 py-6 border-b-2 border-white/70 text-white/90 hover:bg-primary/80 hover:text-white/70">
      <div className=" flex items-center  ">
        <h1 className="text-[16px] font-black text-start whitespace-normal">{nome} | {nickname}</h1>
      </div>
      <div className="w-full flex flex-wrap mt-2 ">
        <div className="min-w-[190px] mr-1">
          <div className="flex ">
            <h1 className="text-[13px] text-white/80 mr-1">Inicio: </h1>
            <h1 className="text-[12px] text-white/80">{dataInicio}</h1>
          </div>
          <div className="flex ">
            <h1 className="text-[13px] text-white/80 mr-1">Ult. Atualização:</h1>
            <h1 className="text-[12px] text-white/80">{ultimaAtualizacao}</h1>
          </div>
        </div>
        <div className="min-w-[190px] ">
          <div className="flex justify-start ">
            <h1 className="text-[13px] text-white/80 mr-1 ">Origem:</h1>
            <h1 className="text-[12px] text-white/80">{origem}</h1>
          </div>
          <div className="flex justify-start ">
            <h1 className="text-[13px] text-white/80 mr-1">Status: </h1>
            <h1 className="text-[12px] text-white/80">{status}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}