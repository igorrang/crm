'use client'; // Garante que o componente seja renderizado no cliente

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' para Next.js 13+ Client Components
import React from 'react';
import { Button } from '../ui/button';

export default function CardLogin() {
  const router = useRouter(); //Component que renderiza paginas no next
  
  // informações inseridas pelo usuario
  const [email, setEmail] = useState(''); //Email inserido pelo usuario
  const [senha, setSenha] = useState(''); //Senha nserido pelo usuario

  // Mensagem de erro caso os dados nao coincidam
  const [mensagemErro, setMensagemErro] = useState(false);

  // Envia o formulario com os dados inseridos e encontra um usuario no banco de dados.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/clientes', { email, senha }); // Manda os dados inseridos e recebe uma resposta caso encontre algum usuario
      const clientes = res.data; // Recebendo um array de objetos. Vem somente 1 unico objeto
     
      // Verifica se o array nao esta vazio. Caso esteja vazio, não encontrou nenhum usuario com os dados preenchidos
      if (clientes.length > 0) {
        const cliente = clientes[0]; // Pega o primeiro objeto do array
        //console.log('Email do Cliente:', cliente.email, ' Senha do cliente:', cliente.senha); // Imprimindo os dados que foram buscados do banco
         // Verificar se os dados que foram encontrados condizem com os inseridos pelo usuario
         if (email === cliente.email && senha === cliente.senha) {
          router.push('/Principal') // Atualizar a pagina
        } else {
          console.log('Os dados inseridos não condizem com os dados encotrados');

          setMensagemErro(!mensagemErro) // Abrir modal que mostrara a mensagem de erro.
        }
      } else {
        //console.log('Nenhum cliente encontrado.');
      }
    } catch (error) {
      //console.error('Erro ao enviar os dados pro servidor/banco', error);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center md:flex-row mt-20 md:mt-0 z-40 md:h-[400px] rounded-2xl shadow-[rgba(0,_0,_0,_0)_0px_0px_0px_2px,_rgba(0,_0,_0,_0.4)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
      <div className="flex items-center">
        <img
          src="/KonvictusLogoWhite.png"
          alt=""
          className="w-[150px] h-[150px] m-10"
        />
      </div>
      <div className="w-[360px] flex flex-col items-center justify-between">
        <h1 className="flex justify-center items-center text-2xl mt-8">
          LOGIN DE CONTA
        </h1>

        <form className="flex flex-col mt-8" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col items-center">
            <label className="w-[300px]" htmlFor="email">
              EMAIL
            </label>

            <input
              className="w-[300px] px-3 py-2 text-md border border-neutral-700 rounded-2xl focus:outline-none focus:border-violet-800"
              type="email"
              name="input_email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="w-[300px] mt-5" htmlFor="senha">
              SENHA
            </label>
            <input
              className="w-[300px] px-3 py-2 text-md border border-neutral-700 rounded-2xl focus:outline-none focus:border-violet-800"
              type="password"
              name="input_senha"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="w-full flex justify-center mt-2 text-sm">
            <div className="w-[300px] flex justify-between">
              <div className="flex gap-2">
                <p className="text-sm pr-12">
                  Não possui uma conta?
                  <a
                    className="font-bold text-primary hover:underline"
                    href="registrar_aluno.html"
                  >
                    Cadastre-se
                  </a>
                </p>
              </div>
              <a className="hover:underline hover:decoration-1" href="#">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <input
              className="bg-primary text-white text-lg px-8 py-2 mb-10 rounded-full cursor-pointer hover:brightness-75"
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>

      {/* Mensagem de erro de login */}
      {mensagemErro && <div className='w-[80%] max-w-[500px] border shadow-2xl absolute bg-white flex flex-col p-5 rounded-2xl'> 
        <p className='text-center mb-3 text-xl'>Não há nenhum usuário com essas informações</p>
        <p className='text-center mb-3 text-xl'>Verifique seu email e senha!</p>
        <Button onClick={() => setMensagemErro(!mensagemErro)}>Confirmar</Button>
      </div>}
      
    </div>
  );
}