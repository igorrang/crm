import DialogEditarFichas from "./dialogs/dialogEditarFichas";

export interface descricaoDepositoProps {
    data: string
    hora: string
    valorReais: string
    valorFichas: string
}

export default function DescricaoDeposito({data, hora, valorReais, valorFichas}: descricaoDepositoProps) {
    return (
        <div className="h-full flex flex-col justify-between">
            {/* Imagem do anexo */}
            <div>
                <div className="relative w-full h-[120px] bg-cover bg-center hover:brightness-90" style={{ backgroundImage: "url('/Planilha.png')" }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-400 bg-transparent">
                    <p className="text-white text-lg">Clique para abrir</p>
                    </div>
                </div>
                <div className="flex justify-between py-2 border-b-2 text-white mt-5 ">
                    <h1 className="text-sm">Data:</h1>
                    <h1 className="text-sm">{data}</h1>
                </div>
                <div className="flex justify-between py-2 border-b-2 text-white">
                    <h1 className="text-sm">Hora:</h1>
                    <h1 className="text-sm">{hora}</h1>
                </div>
                <div className="flex justify-between py-2 border-b-2 text-white">
                    <h1 className="text-sm">Valor Reais:</h1>
                    <h1 className="text-sm">{valorReais}</h1>
                </div>
                <div className="flex justify-between py-2 border-b-2 text-white">
                    <h1 className="text-sm">Valor Fichas:</h1>
                    <h1 className="text-sm">{valorFichas}</h1>
                </div>
            </div>
        <div className="w-full flex justify-end">
        
        <DialogEditarFichas identificador_props="" data_props="" hora_props="" valorReais_props="" valorFicha_props="" anexo_props=""></DialogEditarFichas>
        </div>
      </div>
    )
}