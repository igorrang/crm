import { Poppins } from "next/font/google";
import { CardDescription } from "../ui/card";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "400"] });

export interface dadosClienteProps {
  dataInicio: string;
  anuncio: string;
  observacoes: string;
  valorFichas: string;
  status: string;
}

export default function DadosCliente({ dataInicio, anuncio, observacoes, valorFichas, status }: dadosClienteProps) {
  return (
    <div>
      <div className="mt-4 bg-primary/85 py-4 px-3 rounded-[10px]">
        <CardDescription className="font-black text-white text-[16px]">Data de Inicio</CardDescription>
        <CardDescription className="mt-1 text-white text-[16px]">{dataInicio}</CardDescription>
      </div>
      <div className="mt-4 bg-primary/85 py-4 px-3 rounded-[10px]">
        <CardDescription className="font-black text-white text-[16px]">Anuncio</CardDescription>
        <CardDescription className="mt-1 text-white text-[16px]">{anuncio}</CardDescription>
      </div>
      <div className="mt-4 bg-primary/85 py-4 px-3 rounded-[10px]">
        <CardDescription className="font-black text-white text-[16px]">Observações</CardDescription>
        <CardDescription className="mt-1 text-white text-[16px]">{observacoes}</CardDescription>
      </div>
      <div className="mt-4 bg-primary/85 py-4 px-3 rounded-[10px]">
        <CardDescription className="font-black text-white text-[16px]">Valor das Fichas</CardDescription>
        <CardDescription className="mt-1 text-white text-[16px]">{valorFichas}</CardDescription>
      </div>
      <div className="mt-4 bg-primary/85 py-4 px-3 rounded-[10px]">
        <CardDescription className="font-black text-white text-[16px]">Status</CardDescription>
        <CardDescription className="mt-1 text-white text-[16px]">{status}</CardDescription>
      </div>
    </div>
  );
}
