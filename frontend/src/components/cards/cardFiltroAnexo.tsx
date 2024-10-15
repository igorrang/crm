'use client'; // Garante que o componente seja renderizado no cliente

export interface cardFiltroClienteProps {
  data: string;
  hora: string;
  valorReais: string;
  valorFichas: string;
  anexo: string;
}

export default function CardFiltroAnexo({ data, hora, valorReais, valorFichas, anexo }: cardFiltroClienteProps) {
  return (
    <div className="w-full  mx-2 px-2 py-6 border-b-2 border-white/70 text-white hover:bg-primary/80 hover:text-white">
      <div className=" flex items-center  ">
        <h1 className="text-[16px] font-black text-white/90 text-start whitespace-normal">anexo</h1>
      </div>
      <div className="w-full flex flex-wrap mt-2 ">
        <div>
          <div className="flex ">
            <h1 className="text-[13px] mr-1 text-white/80">Data: </h1>
            <h1 className="text-[12px] text-white/80">2024-05-20</h1>
          </div>
          <div className="flex ">
            <h1 className="text-[13px] mr-1 text-white/80"> Hora:</h1>
            <h1 className="text-[12px] text-white/80">12:30</h1>
          </div>
        </div>        
      </div>
    </div>
  );
}