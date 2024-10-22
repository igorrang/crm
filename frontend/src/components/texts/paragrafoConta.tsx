import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

export interface paragrafoContaProps {
  texto: string;
}

export default function ParagrafoConta({ texto }: paragrafoContaProps) {
  return (
    <p
      className={`${poppins.className} text-center leading-5 ml-1 text-white/75 text-[14px]`}
    >
      {texto}
    </p>
  );
}
