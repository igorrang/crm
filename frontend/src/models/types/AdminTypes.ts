export type Action =  
 |'CREATE_USER_LEADS'
 |'ADD_FICHAS'
 |'CONFIRM_PAYMENT'
 |'ADD_FICHAS_BONUS'
 |'ADD_USER_INSTAGRAM'
 |'ADD_USER_WHATS'
 |'ADD_USER_DIRECT'
 |'ADD_DATA_INICIO'
 | 'BIO_INSTAGRAM'
 | 'DIRECT'
 | 'WHATSAPP'


    export type TriggeredBy = 'ADMIN ' | 'UNKNOW' | 'USER'

    export interface Metadata {
        triggeredBy: TriggeredBy;
        userRef: string;
    }

    export enum LeadsOrigin {
      BIO_INSTAGRAM = 'BIO_INSTAGRAM',
      WHATSAPP =  'WHATSAPP',
      DIRECT = 'DIRECT'
    }


    export enum AdmActions {
        CREATE_USER_LEADS = 'CREATE_USER_LEADS',
        ADD_FICHAS = 'ADD_FICHAS',
        CONFIRM_PAYMENT = 'CONFIRM_PAYMENT',
        ADD_FICHAS_BONUS = 'ADD_FICHAS_BONUS',
        ADD_USER_INSTAGRAM = 'ADD_USER_INSTAGRAM',
        ADD_USER_WHATSAPP = 'ADD_USER_WHATS',
        ADD_USER_DIRECT = 'ADD_USER_DIRECT',
        ADD_DATA_INICIO = 'ADD_DATA_INICIO'
        
    }


    export enum UserStatus {
        CADASTROU = 'CADASTROU'

    }

    export interface CreateLead {
        nome: string;
        origem: string;
        status: string;
        datainicio: Date;
        nickname: string;
        valorFicha: string;
        observacoes?: string;
    }


    export interface UpdateLead{
        datainicio: string;
        nome: string;
        origem: string;
        nickname: string;
        observacao: string;
        valorFicha: string;
        status: string;
        ultimatualizacao: string;
    }