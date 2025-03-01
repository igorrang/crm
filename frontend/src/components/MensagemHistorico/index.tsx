import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export interface MensagemHistoricoProps {
  texto: string;
}

export default function MensagemHistorico({ texto }: MensagemHistoricoProps) {
  return (
    <p
      className={`${poppins.className} whitespace-normal  leading-5 text-white text-[14px] font-black`}
    >
      {texto}
    </p>
  );
}