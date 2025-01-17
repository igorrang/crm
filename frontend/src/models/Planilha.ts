
import mongoose,{Schema, Document} from 'mongoose'
export interface Planilha extends Document {
    datainicio : Date ;
    nome : string ;
    origem:  string;
    nickname: string;
    observacoes: string;
    valordasfichas: string ;
    status: string ;
    ultimatualizacao: string;
    editar: string
}
 export interface FiltroResponse<T>{
    data: T;
 }

const planilhaSchema = new Schema <Planilha> (
    {
        nome :String,
        origem: String,
        status: String,
        datainicio: Date,
        nickname: String,
        valordasfichas: String,
        ultimatualizacao: String,
        editar: String

      
    }
)

const PlanilhaTabela =     
mongoose?.models?.PlanilhaTabela ||
mongoose.model<Planilha>('PlanilhaTabela', planilhaSchema);


export default PlanilhaTabela