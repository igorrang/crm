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
    <div className="w-full  mx-2 px-2 py-6 border-b-2 border-gray-300 text-white hover:bg-primary/80 hover:text-white">
      <div className=" flex items-center  ">
        <h1 className="text-[16px] font-black text-start whitespace-normal">anexoooooooo</h1>
      </div>
      <div className="w-full flex flex-wrap mt-2 ">
        <div>
          <div className="flex ">
            <h1 className="text-[13px] mr-1">Data: </h1>
            <h1 className="text-[12px]">2024-05-20</h1>
          </div>
          <div className="flex ">
            <h1 className="text-[13px] mr-1"> Hora:</h1>
            <h1 className="text-[12px]">12:30</h1>
          </div>
        </div>        
      </div>
    </div>
  );
}