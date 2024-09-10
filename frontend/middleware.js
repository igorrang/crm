// pages/_middleware.js
import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req, res) {
  // Verifique se o usuário está autenticado
  if (!req.headers.get('authorization')) {
    return NextResponse.redirect('/login')
  }

  // Modifique a requisição ou resposta se necessário

  // Passe o controle para o próximo middleware/rota
  return NextResponse.next()
}