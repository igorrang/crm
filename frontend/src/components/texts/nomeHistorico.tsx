import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "600"] });

export interface NomeHistoricoProps {
  texto: string;
}

export default function NomeHistorico({ texto }: NomeHistoricoProps) {
  return (
    <p
      className={`${poppins.className} leading-5 text-black text-[18px] font-black`}
    >
      {texto}
    </p>
  );
}
