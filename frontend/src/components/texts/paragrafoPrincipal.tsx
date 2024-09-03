import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "300" });

export interface ParagrafoPrincipalProps {
  texto: string;
}

export default function ParagrafoPrincipal({ texto }: ParagrafoPrincipalProps) {
  return (
    <p
      className={`${poppins.className} leading-5 mt-10 text-white text-[16px] font-black`}
    >
      {texto}
    </p>
  );
}
