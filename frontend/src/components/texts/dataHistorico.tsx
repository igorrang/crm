import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "400"] });

export interface DataHistoricoProps {
  texto: string;
}

export default function DataHistorico({ texto }: DataHistoricoProps) {
  return (
    <p
      className={`${poppins.className} leading-5  text-black text-[13px] `}
    >
      {texto}
    </p>
  );
}
