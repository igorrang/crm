import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";

export default function DialogCadastrarCliente() {
  const [dataInicio, setDataInicio] = useState('')
  const [nome, setNome] = useState('')
  const [origem, setOrigem] = useState('')
  const [observacao, setObservacao] = useState('')
  const [valorFicha, setValorFicha] = useState('')
  const [status, setStatus] = useState('')
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState('')
  
  
  const cadastrandoCliente = async (e: React.FormEvent) => {
    e.preventDefault();

    
    console.log({dataInicio, nome, origem, observacao, valorFicha, status, ultimaAtualizacao});
    
    try {
      const res = await axios.post("/api/table", {dataInicio, nome, origem, observacao, valorFicha, status, ultimaAtualizacao});
      console.log(res.data);  // Verificar a resposta do backend
        // Verifique se a requisição foi bem-sucedida
        if (res.status === 200) {
          console.log('Cliente cadastrado com sucesso!');
          // Usar router.push para redirecionar e recarregar a página
          window.location.reload()

        } else {
          console.error('Erro ao cadastrar cliente:', res.statusText);
        }
    } catch (error) {
      console.error('Error posting client data:', error);
    }
  };

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
        <form onSubmit={cadastrandoCliente} className="grid grid-cols-2 gap-4 py-4">
          <div>
            <div className=" items-center gap-4">
              <Label htmlFor="dataInicio" className="text-right">
                Data de Inicio
              </Label>
              <Input
                id="dataInicio"
                type="date"
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
            <div className="flex flex-col py-1 gap-2">
              <Label  className="text-start"> Origem </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="justify-start" >
                  <Button variant="outline" className="">{origem}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Painel origem</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={origem} onValueChange={setOrigem}>
                    <DropdownMenuRadioItem value="Instagram (Bio)"> Instagram (Bio)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Indicação">Indicação</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Anuncio">Anuncio</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
                onKeyDown={(e) => {
                      if(e.key === ",") {
                        e.preventDefault()
                        window.alert('Utilize o "." para inserir os centavos')
                      }
                    }}
                value={valorFicha}
                onChange={(e) => setValorFicha(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col py-1 gap-2">
              <Label  className="text-start"> Status </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="justify-start" >
                  <Button variant="outline" className="">{status}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Painel origem</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
                    <DropdownMenuRadioItem value="Fracassado"> Fracassado</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Pendente"> Pendente</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Processando">Processando</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Sucesso">Sucesso</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="ultimaAtualizacao" className="text-right">
                Ultima Atualizacao
              </Label>
              <Input
                id="ultimaAtualizacao"
                type="date"
                className=""
                value={ultimaAtualizacao}
                onChange={(e) => setUltimaAtualizacao(e.target.value)}
                required
              />
            </div>
          <DialogFooter className="mt-24">
            <Button type="submit" >Confirmar</Button>
          </DialogFooter>
          </div>
        </form>
        
      </DialogContent>
    </Dialog>
  )
}