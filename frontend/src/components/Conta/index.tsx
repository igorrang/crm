import Header from "@/components/Header"
import Navbar from "@/components/Narbar"
import DadosConta from "@/components/DadosConta"
import TituloCardConta from "@/components/TituloCardConta"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"
import { AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { LiaUserEditSolid } from "react-icons/lia";
import { GoKey } from "react-icons/go";
import ParagrafoConta from "@/components/ParagrafoConta"
import { Button } from "@/components/ui/button"

export default function Conta() {
  return (
   <>
    <Header></Header>
    <div className="flex">
      <Navbar></Navbar>

      <div className="w-full min-h-[94vh] text-black bg-gradient-to-l from-black via-black/90 to-black/85 ">
          <div className="hidden lg:flex w-full py-4 px-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/Principal">Principal</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/Conta">Conta</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Container principal */}
          <div className="w-full flex justify-center py-10">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 01 */}
              <div className="px-5 w-[280px] h-[600px] border border-white/70 shadow shadow-2xl flex flex-col items-center bg-secondary">
                {/* Div foto usuario e o nome */}
                <div className="h-[100px] my-5 flex flex-col items-center">
                  <img src="/KonvictusLogoWhite.png" alt="" width={70} className="my-5"/>
                  <TituloCardConta texto="Marcos Miguel" />
                </div>
                {/* Div com os dados do perfil */}
                <div className="my-10">
                  {/* Email */}
                  <div className="flex items-center my-1 ">
                    <AiOutlineMail className="text-gray-500 text-[17px] mr-1"/> 
                    <DadosConta texto="marcos@konvictus.com.br"/>
                  </div>
                  {/* Telefone */}
                  <div className="flex items-center my-1 ">
                    <FiPhone className="text-gray-500 text-[17px] mr-1"/> 
                    <DadosConta texto="51 99389-3153"/>
                  </div>
                </div>
              </div>
              {/* Card 02 */}
              <div className="px-5 w-[280px] h-[300px] border border-white/70 shadow shadow-2xl flex flex-col items-center bg-secondary">
                {/* Div com o titulo do card e o icone do card */}
                <div className="h-[100px] my-5 flex flex-col items-center">
                  <TituloCardConta texto="Editar Perfil" />
                  <LiaUserEditSolid className="text-[90px] my-3 text-white/85"/> 
                </div>
                {/* Paragrafo com texto auxiliar do card */}
                <ParagrafoConta texto="Mantenha as informações do seu perfil sempre atualizadas." />
                {/* Botão do card */}
                <Button variant="ghost" size="cardConta">Editar Perfil</Button>
                
              </div>

              {/* Card 03 */}
              <div className="px-5 w-[280px] h-[300px] border border-white/70 shadow shadow-2xl flex flex-col items-center bg-secondary">
                {/* Div com o titulo do card e o icone do card */}
                <div className=" h-[100px] my-5 flex flex-col items-center">
                  <TituloCardConta texto="Senha" />
                  <GoKey className="text-[50px] my-3 text-white/85"/> 
                </div>
                {/* Paragrafo com texto auxiliar do card */}
                <ParagrafoConta texto="Tornar sua senha mais forte ou alterá-la caso outra pessoa a conheça." />
                {/* Botão do card */}
                <Button variant="ghost" size="cardConta">Alterar Senha</Button>
                
              </div>
            </div>
          </div>
        </div>
    </div>
</>
  )
}