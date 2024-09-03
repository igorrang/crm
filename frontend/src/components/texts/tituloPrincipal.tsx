import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export interface TituloPrincipalProps {
  texto: string;
}

export default function TituloPrincipal({ texto }: TituloPrincipalProps) {
  return (
    <h1
      className={`${poppins.className} leading-6 mt-10 text-white text-[23px] font-black`}
    >
      {texto}
    </h1>
  );
}
