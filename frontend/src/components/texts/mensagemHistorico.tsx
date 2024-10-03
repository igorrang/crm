import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "300" });

export interface MensagemHistoricoProps {
  texto: string;
}

export default function MensagemHistorico({ texto }: MensagemHistoricoProps) {
  return (
    <p
      className={`${poppins.className} whitespace-normal bg-primary/10 border shadow-md rounded-3xl leading-5 py-2 px-3 text-black text-[14px] font-black`}
    >
      {texto}
    </p>
  );
}