import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
 
export default function DialogEditarCliente() {
  // variaveis pra receber o valor de cada coluna e imprimir no input
  const [identificador, setIdentificador] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [nome, setNome] = useState('')
  const [anuncio, setAnuncio] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [valorFichas, setValorFichas] = useState('')
  const [status, setStatus] = useState('')

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant="clean" size="clean" className="text-white font-black mt-2">Editar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
            <DialogDescription>Editar dados do cliente</DialogDescription>
          </DialogHeader>
          <form action="" className="">
            
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <div className=" items-center gap-4">
                  <Input
                    id="identificador"
                    className="hidden"
                    value={identificador} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setIdentificador(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
                <div className=" items-center gap-4">
                  <Label htmlFor="dataInicio" className="text-right"> Data de Inicio </Label>
                  <Input
                    id="dataInicio"
                    className=""
                    value={dataInicio} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setDataInicio(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="nome" className="text-right"> Nome </Label>
                  <Input
                    id="nome"
                    className=""
                    value={nome} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setNome(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="anuncio" className="text-right"> Anuncio </Label>
                  <Input
                    id="anuncio"
                    className=""
                    value={anuncio} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setAnuncio(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
              </div>
              <div>
                <div className="items-center gap-4">
                  <Label htmlFor="observacoes" className="text-right"> Observacoes </Label>
                  <Input
                    id="observacoes"
                    className=""
                    value={observacoes} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setObservacoes(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="valorFichas" className="text-right"> Valor Fichas </Label>
                  <Input
                    id="valorFichas"
                    className=""
                    value={valorFichas} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setValorFichas(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="status" className="text-right"> Status </Label>
                  <Input
                    id="status"
                    className=""
                    value={status} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setStatus(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
              <DialogFooter className="mt-24">
                <Button type="submit">Confirmar</Button>
              </DialogFooter>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  )
}