"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react"
import axios from "axios"
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

// Props para receber os dados ao chamar o component
export interface dialogFichasProps {
  identificador_props: string
}
 
export default function DialogFichas({identificador_props}: dialogFichasProps) {
  // useState pra receber o valor de cada coluna e imprimir no input
  const [identificadorCliente, setIdentificadorCliente] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [valorReais, setValorReais] = useState('')
  const [valorFicha, setValorFicha] = useState('')
  const [anexo, setAnexo] = useState('')

  // Pega o valor da coluna de cada linha e imprime no campo do input
  useEffect(() => {
    setIdentificadorCliente(identificador_props || '');
  });

  const cadastrarfichas = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("/api/table", {identificadorCliente, data, hora, valorReais, valorFicha, anexo});
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
        <Button variant="clean">Fichas</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Fichas</DialogTitle>
          <DialogDescription>Registrar compra de fichas</DialogDescription>
        </DialogHeader>
        <form  onSubmit={cadastrarfichas} className="grid grid-cols-2 gap-4 py-4" encType="multipart/form-data">
            <div>
              {/* Serve pro identificador do cliente */}
              <div className="  gap-4">
                <Input id="identificador" className="hidden" value={identificadorCliente}  onChange={(e) => setIdentificadorCliente(e.target.value)} required/>
              </div>
              <div className="gap-4">
                <Label htmlFor="data" className="text-right text-white"> Data </Label>
                <Input id="data" type="date" value={data}  onChange={(e) => setData(e.target.value)} required/>
              </div>
              <div className=" gap-4">
                <Label htmlFor="hora" className="text-right text-white"> Hora </Label>
                <Input id="hora" type="time" value={hora}  onChange={(e) => setHora(e.target.value)} required/>
              </div>
            </div>
            <div>
              <div className=" gap-4">
                <Label htmlFor="valorReais" className="text-right text-white"> Valor Reais </Label>
                <Input id="valorReais" type="number" value={valorReais}  onChange={(e) => setValorReais(e.target.value)} required
                  onKeyDown={(e) => {
                    if(e.key === ",") {
                      e.preventDefault()
                      window.alert('Utilize o "." para inserir os centavos')
                    }
                  }}
                />
              </div>
                
              <div className=" gap-4">
                <Label htmlFor="valorFichas" className="text-right text-white"> Valor Fichas </Label>
                <Input id="valorFichas" type="number" value={valorFicha}  onChange={(e) => setValorFicha(e.target.value)} required
                  onKeyDown={(e) => {
                    if(e.key === ",") {
                      e.preventDefault()
                      window.alert('Utilize o "." para inserir os centavos')
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-span-2 gap-2">
              <Label htmlFor="anexo" className="text-right text-white"> Anexo </Label>
              <Input className="text-white" id="anexo" type="file" value={anexo}  onChange={(e) => setAnexo(e.target.value)} required />
            </div>
            <DialogFooter className=" col-span-2">
              <Button type="submit">Confirmar</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  )
}