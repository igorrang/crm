import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

export interface dadosContaProps {
  texto: string;
}

export default function DadosConta({ texto }: dadosContaProps) {
  return (
    <p
      className={`${poppins.className} leading-5 ml-1 text-gray-500 text-[14px]`}
    >
      {texto}
    </p>
  );
}
