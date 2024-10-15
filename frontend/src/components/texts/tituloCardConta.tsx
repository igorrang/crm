import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

export interface tituloCardContaProps {
  texto: string;
}

export default function TituloCardConta({ texto }: tituloCardContaProps) {
  return (
    <p
      className={`${poppins.className} leading-5 ml-1 text-white text-[20px]`}
    >
      {texto}
    </p>
  );
}
