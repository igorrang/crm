import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export interface TituloSecundarioProps {
  texto: string;
}

export default function TituloSecundario({ texto }: TituloSecundarioProps) {
  return (
    <h1
      className={`${poppins.className} leading-6 my-3 text-black text-[23px] font-black`}
    >
      {texto}
    </h1>
  );
}
