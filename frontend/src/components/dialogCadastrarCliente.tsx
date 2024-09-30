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
import axios from "axios"
import { useState } from "react"
 
export default function DialogCadastrarCliente() {
  const [dataInicio, setDataInicio] = useState('')
  const [nome, setNome] = useState('')
  const [origem, setOrigem] = useState('')
  const [observacao, setObservacao] = useState('')
  const [valorFicha, setValorFicha] = useState('')
  const [status, setStatus] = useState('')
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState('')

  const cadastrandoCliente = async () => {
      const res = await axios.post("/api/table", {dataInicio, nome, origem, observacao, valorFicha, status, ultimaAtualizacao})
      
    }

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
                Origem
              </Label>
              <Input
                id="origem"
                className=""
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
                required
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="anuncio" className="text-right">
                Observacao
              </Label>
              <Input
                id="observacao"
                className=""
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div className="items-center gap-4">
              <Label htmlFor="observacoes" className="text-right">
                Valor das Fichas
              </Label>
              <Input
                id="valorFicha"
                className=""
                value={valorFicha}
                onChange={(e) => setValorFicha(e.target.value)}
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
            <div className="items-center gap-4">
              <Label htmlFor="valorFichas" className="text-right">
                Ultima Atualizacao
              </Label>
              <Input
                id="valorFichas"
                className=""
                value={ultimaAtualizacao}
                onChange={(e) => setUltimaAtualizacao(e.target.value)}
                required
              />
            </div>
          <DialogFooter className="mt-24">
            <Button type="submit" onClick={cadastrandoCliente}>Confirmar</Button>
          </DialogFooter>
          </div>
        </form>
        
      </DialogContent>
    </Dialog>
  )
}