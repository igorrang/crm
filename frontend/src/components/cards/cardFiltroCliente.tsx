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
    <div className="bg-primary w-full  px-3 py-2 my-3">
      <div className=" flex items-center text-white ">
        <img src="/verCliente.png" className="w-[50px] h-[50px]" alt="" />
        <h1 className="text-lg font-black ml-3">{nome}</h1>
      </div>
      <div className="w-full flex mt-2 ">
        <div className="w-[50%]">
          <div className="flex text-white ">
            <h1 className="text-sm font-black mr-1">Inicio:</h1>
            <h1 className="text-sm">{dataInicio}</h1>
          </div>
          <div className="flex text-white ">
            <h1 className="text-sm font-black mr-1">Ult. Atualização:</h1>
            <h1 className="text-sm">{ultimaAtualizacao}</h1>
          </div>
        </div>
        <div className="w-[50%] flex flex-col items-end">
          <div className="flex justify-start text-white ">
            <h1 className="text-sm font-black mr-1 ">Origem</h1>
            <h1 className="text-sm">{origem}</h1>
          </div>
          <div className="flex justify-start text-white ">
            <h1 className="text-sm font-black mr-1">Status:</h1>
            <h1 className="text-sm">{status}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}