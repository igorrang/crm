'use client'; // Garante que o componente seja renderizado no cliente

export interface cardFiltroClienteProps {
  nome: string;
  dataInicio: string;
  ultimaAtualizacao: string;
  origem: string;
  status: string;
}

export default function CardFiltroCliente({ nome, dataInicio, origem, status, ultimaAtualizacao }: cardFiltroClienteProps) {
  return (
    <div className="bg-primary/80 rounded-3xl w-full  px-4 py-3 my-3">
      <div className=" flex items-center text-white ">
        <img src="/verCliente.png" className="w-[50px] h-[50px]" alt="" />
        <h1 className="text-lg font-black ml-3 text-start whitespace-normal">{nome}</h1>
      </div>
      <div className="w-full flex flex-wrap mt-2 ">
        <div className="min-w-[210px] mr-1">
          <div className="flex text-white ">
            <h1 className="text-[12px] font-black mr-1">Inicio - </h1>
            <h1 className="text-[12px]">{dataInicio}</h1>
          </div>
          <div className="flex text-white ">
            <h1 className="text-[12px] font-black mr-1">Ult. Atualização - </h1>
            <h1 className="text-[12px]">{ultimaAtualizacao}</h1>
          </div>
        </div>
        <div className="min-w-[210px] ">
          <div className="flex justify-start text-white ">
            <h1 className="text-[12px] font-black mr-1 ">Origem - </h1>
            <h1 className="text-[12px]">{origem}</h1>
          </div>
          <div className="flex justify-start text-white ">
            <h1 className="text-[12px] font-black mr-1">Status - </h1>
            <h1 className="text-[12px]">{status}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}