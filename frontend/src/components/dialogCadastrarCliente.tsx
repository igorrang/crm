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
 
export default function DialogCadastrarCliente() {
  const [dataInicio, setDataInicio] = useState('')
  const [nome, setNome] = useState('')
  const [contato, setContato] = useState('')
  const [anuncio, setAnuncio] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [valorFichas, setValorFichas] = useState('')
  const [status, setStatus] = useState('')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Cadastrar Cliente</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Cliente</DialogTitle>
          <DialogDescription>
            Insira os dados do cliente e logo após confirme para cadastrar um cliente
          </DialogDescription>
        </DialogHeader>
        <form action="" className="grid grid-cols-2 gap-4 py-4">
          <div>
            <div className=" items-center gap-4">
              <Label htmlFor="dataInicio" className="text-right">
                Data de Inicio
              </Label>
              <Input
                id="dataInicio"
                className=""
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                required
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input
                id="nome"
                className=""
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="contato" className="text-right">
                Contato
              </Label>
              <Input
                id="contato"
                className=""
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                required
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="anuncio" className="text-right">
                Anuncio
              </Label>
              <Input
                id="anuncio"
                className=""
                value={anuncio}
                onChange={(e) => setAnuncio(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div className="items-center gap-4">
              <Label htmlFor="observacoes" className="text-right">
                Observacoes
              </Label>
              <Input
                id="observacoes"
                className=""
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                required
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="valorFichas" className="text-right">
                Valor Fichas
              </Label>
              <Input
                id="valorFichas"
                className=""
                value={valorFichas}
                onChange={(e) => setValorFichas(e.target.value)}
                required
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Input
                id="status"
                className=""
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
            </div>
          <DialogFooter className="mt-24">
            <Button type="submit">Confirmar</Button>
          </DialogFooter>
          </div>
        </form>
        
      </DialogContent>
    </Dialog>
  )
}