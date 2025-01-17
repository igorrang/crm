import { CreateLead, UpdateLead } from './../models/types/AdminTypes';
import {connectMongoDB} from './lib/mongodb'
import mongoose, { UpdateQuery } from 'mongoose';
import PlanilhaTabela,{Planilha} from '@/models/Planilha';


const findLeedById = async (id:string) => {
    await connectMongoDB()
    const leed = await PlanilhaTabela.findById(id).select(['credentials'])
    if (leed ){
        return leed
    }
    return null
}

const createLeed = async (CreateLead:CreateLead) => {
    await connectMongoDB()

    let dbData: Planilha | null = null;
    dbData = await PlanilhaTabela.create({
        nome: CreateLead.nome,
        origem: CreateLead.origem,
        status: CreateLead.status,
        datainicio: CreateLead.datainicio,
        nickname: CreateLead.nickname,
        valordasfichas: CreateLead.valorFicha,
        ultimatualizacao: CreateLead.status,
        editar: CreateLead.status
    })
}
const findLeedByNickName = async (nickname:string) => {
    await connectMongoDB()

    let dbData = null 
    try {
        dbData = await PlanilhaTabela.findOne({nickname: nickname})
    } catch(error) {
        return dbData
    }
    return null
}

const findDataInicio= async (datainicio:string) =>{
    await connectMongoDB()

    let dbData = null

    try {
        dbData = await PlanilhaTabela.findOne({datainicio:datainicio})
    } catch(error){
        console.log(error)
    }

    if (dbData) {
        return dbData
    }

    return null
}

const findByName = async (nome:string) => {
    await connectMongoDB()

    let dbData = null

    try {
        dbData = await PlanilhaTabela.findOne({nome:nome})
    } catch(error) {
        console.log(error)
    }

    if (dbData) {
        return dbData
    }
}


const updateLead = async(id:string, UpdateLead:UpdateLead) => {
    await connectMongoDB()
    
    const updateQuery: UpdateQuery<Planilha> = Object.keys(UpdateLead)
    .filter((key)=> UpdateLead[key as keyof UpdateLead]!== undefined)
    .reduce((acc, key) => {
        acc[key as keyof UpdateQuery<Planilha>] = UpdateLead[key as keyof UpdateLead]
        return acc
    }, {} as UpdateQuery<Planilha>)

    if (Object.keys(updateQuery).length === 0 ){
        throw new Error('No fields to update')
    }

    await PlanilhaTabela.findByIdAndUpdate(id,updateQuery,{new:true})
}

const deleteLead = async (id:string) => {
    if (!mongoose.Types.ObjectId.isValid(id)){
        throw new Error('ID invalid')
    }

    const lead = await PlanilhaTabela.findById(id)
    if (!lead){
        throw new Error('Lead not found')
    }
    await PlanilhaTabela.deleteOne({_id: id})

    return {success: true, message:'User delete',leadId: id}
}

export default {
    findLeedById,
    createLeed,
    findLeedByNickName,
    findDataInicio,
    findByName,
    updateLead,
    deleteLead
}