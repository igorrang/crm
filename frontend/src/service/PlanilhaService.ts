import { CreateLead, UpdateLead } from '../models/types/AdminTypes';
import { connectToDatabase } from './lib/mongodb';
import mongoose, { UpdateQuery } from 'mongoose';
import PlanilhaTabela, { Planilha } from '@/models/Planilha';

class PlanilhaService {
  // Criar novo registro
  static async createLeed(createLead: CreateLead) {
    try {
      await connectToDatabase();
      
      console.log('Tentando salvar:', createLead);
      
      const dbData = await PlanilhaTabela.create({
        nome: createLead.nome,
        origem: createLead.origem,
        status: createLead.status,
        datainicio: createLead.datainicio,
        nickname: createLead.nickname,
        valordasfichas: createLead.valorFicha,
        ultimatualizacao: new Date().toISOString(),
        editar: createLead.status,
        bonus: createLead.bonus,
        anuncio: createLead.anuncio,
        instagram: createLead.instagram,
        contato: createLead.contato
      });

      console.log('Dados salvos com sucesso:', dbData);
      return { success: true, data: dbData };
      
    } catch (error) {
      console.error('Erro ao salvar:', error);
      throw error;
    }
  }

  // Buscar por ID
  static async findLeedById(id: string) {
    await connectToDatabase();
    return await PlanilhaTabela.findById(id);
  }

  // Atualizar registro
  static async updateLead(id: string, updateLead: UpdateLead) {
    await connectToDatabase();
    
    const updateQuery: UpdateQuery<Planilha> = Object.keys(updateLead)
      .filter((key) => updateLead[key as keyof UpdateLead] !== undefined)
      .reduce((acc, key) => {
        acc[key as keyof UpdateQuery<Planilha>] = updateLead[key as keyof UpdateLead];
        return acc;
      }, {} as UpdateQuery<Planilha>);

    if (Object.keys(updateQuery).length === 0) {
      throw new Error('No fields to update');
    }

    return await PlanilhaTabela.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  // Deletar registro
  static async deleteLead(id: string) {
    await connectToDatabase();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('ID invalid');
    }

    const lead = await PlanilhaTabela.findById(id);
    if (!lead) {
      throw new Error('Lead not found');
    }

    await PlanilhaTabela.deleteOne({ _id: id });
    return { success: true, message: 'Lead deleted', leadId: id };
  }

  // Listar todos os registros
  static async listarPlanilhas() {
    await connectToDatabase();
    return await PlanilhaTabela.find({}).sort({ datainicio: -1 });
  }

  // Filtrar por data
  static async filtrarPorData(dateFrom: Date, dateTo: Date) {
    await connectToDatabase();
    return await PlanilhaTabela.find({
      datainicio: {
        $gte: new Date(dateFrom),
        $lte: new Date(dateTo)
      }
    }).sort({ datainicio: -1 });
  }
}

export default PlanilhaService;