import { Button } from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="w-full bg-black text-white py-2 flex justify-center">
        <h2 className="text-[24px]  font-bold">Disponível em breve</h2>
      </div>
      <header className="w-full header-bg bg-cover bg-no-repeat h-[714px] flex flex-col items-center">
        <Image
          src="/images/KonvictusLogo.png"
          alt="Logo konvictus"
          width={350}
          height={49}
          className="mt-[71px]"
        />

        <h1 className="text-[104px] text-white text-center font-extralight mt-[126px] leading-10">
          Conectando
        </h1>
        <h1 className="text-[104px] text-white text-center font-extralight">
          com
          <span className="font-bold text-yellowPrimary"> segurança</span>
        </h1>
      </header>
      <main className="flex-1 bg-[#282828] flex flex-col items-center h-[3224px]">
        <div className="w-[1152px] h-[362px] bg-yellowPrimary rounded-3xl mt-[-100px] mb-[94px] py-12 flex items-center justify-center gap-8">
          <Image
            src="/images/Kovnictus.png"
            alt="Illustration"
            width={254}
            height={267}
          />
         
        </div>
        <div className="flex ml-[259px] mr-[210px] gap-12 mb-[97px] mt-[97px]">
          <div className="flex flex-col gap-11 w-[707px] z-10 leading-8">
            <h1 className="text-white text-[56px] font-extrabold">
              Quem somos?
            </h1>
            <p className="text-[#FFFFFF] text-[28px]">
              Bem vindo denovo ao seu crm <br/> Um espaço para cuidar do seu negocio <br /> com
              segurança  <br /> que promove
              todas as soluções<br /> que voce precisa .
            </p>
            <p className="text-[#FFFFFF] text-[28px]">
              Somos o produto que inova o conceito de crm c <br /> com vantagens únicas 
              e  exclusivas para cada necessidade.
            </p>
          </div>
          <div className="relative h-[348px] w-[348px] bg-yellowPrimary rounded-3xl">
            <Image
              src="/images/man_image.png"
              alt="Man ilustration"
              width={348}
              height={348}
              className="absolute top-0 left-0 -translate-x-[10%] translate-y-[-5%]"
            />
          </div>
        </div>
        <div className="mr-[211px] bg-[#F4F4F4] w-full h-[837px] rounded-tr-3xl rounded-br-3xl flex flex-col py-14 items-center justify-center">
          <div>
            
           
            <p className="text-[28px] mt-4">
              Protegemos suas informações com rigor, oferecendo uma <br />{' '}
              <span className="font-extrabold">experiência online segura.</span>
            </p>
            {/* <Button className="w-[540px] h-[48px] mt-[41px] text-black text-3xl bg-yellowPrimary rounded-2xl font-bold">
              <Link href="/comprar">Veja as ofertas disponíveis</Link>
            </Button> */}
          </div>
        </div>
        <div className="ml-[211px] bg-yellowPrimary w-full h-[837px] rounded-tl-3xl rounded-bl-3xl flex flex-col py-14 items-center justify-center">
          <div className="flex flex-col items-end">
          
           
            <p className="text-[28px] mt-4 text-right">
              Faça parte de uma comunidade e descubra <br />{' '}
              <span className="font-extrabold">novas oportunidades.</span>
            </p>
            {/* <Button className="w-[540px] h-[48px] mt-[41px] text-black text-3xl bg-white rounded-2xl font-bold">
              <Link href="/comprar">Veja as ofertas disponíveis</Link>
            </Button> */}
          </div>
        </div>
        <div className="flex ml-[259px] mr-[210px] gap-24 mb-[49px] mt-[97px] items-center">
          <div className="relative h-[348px] w-[348px] bg-yellowPrimary rounded-3xl">
            <Image
              src="/images/man2_image.png"
              alt="Man ilustration"
              width={348}
              height={348}
              className="absolute top-0 left-0 translate-x-[10%] translate-y-[-5%]"
            />
          </div>
          <div className="flex flex-col w-[707px] z-10 leading-8">
            <h1 className="text-white text-[56px] font-extrabold mb-[48px]">
              Vantagens
            </h1>
            <div className="flex flex-col gap-4">
              <p className="flex gap-4 text-3xl font-extralight items-center text-[#FFFFFF]">
                <Image
                  src="/images/like.svg"
                  alt="Like icon"
                  width={56}
                  height={56}
                />
                Avaliação dos usuários;
              </p>
              <p className="flex gap-4 text-3xl font-extralight items-center text-[#FFFFFF]">
                <Image
                  src="/images/cash.svg"
                  alt="Cash icon"
                  width={56}
                  height={56}
                />
                Valor acessível;
              </p>
              <p className="flex gap-4 text-3xl font-extralight items-center text-[#FFFFFF]">
                <Image
                  src="/images/lock.svg"
                  alt="Lock icon"
                  width={56}
                  height={56}
                />
                Segurança ;
              </p>
              <p className="flex gap-4 text-3xl font-extralight items-center text-[#FFFFFF]">
                <Image
                  src="/images/chat.svg"
                  alt="Chat icon"
                  width={56}
                  height={56}
                />
                Contato com o suporte ;
              </p>
              <p className="flex gap-4 text-3xl font-extralight items-center text-[#FFFFFF]">
                <Image
                  src="/images/share.svg"
                  alt="Share icon"
                  width={56}
                  height={56}
                />
                Conexão direta entre as partes.
              </p>
            </div>
          </div>
        </div>
        <Button className="w-[540px] h-[48px] mt-[41px] mb-[61px] text-black text-3xl bg-yellowPrimary rounded-2xl font-bold self-center" disabled>
          Disponível em breve!
        </Button>
      </main>
      <footer className="h-[158px] bg-black flex items-center justify-center">
        <p className="text-center text-3xl text-[#FFF]">
          Um espaço{' '}
          <span className="text-yellowPrimary font-extrabold">
            seguro, confiável e ágil
          </span>{' '}
          para realizar teus objoetivos.
        </p>
      </footer>
    </div>
  )
}
