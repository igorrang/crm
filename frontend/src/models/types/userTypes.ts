
export enum UserProvider{
    EMAIL_PASSWORD = 'EMAIL_PASSWORD',
    GOOGLE_AUTH = 'GOOGLE_AUTH',
}
export interface ForgotPasswordRequest {
  email: string;
}

export interface CreateUserDto{
  name: string;
  surname: string;
  email: string;
  confirmEmail: string;
  cpf: string;
  phone: string;
  password: string;
  confirmPassword: string;
  birthdate: Date;
  
  provider: UserProvider;
}

export interface UpdateUserDto{
    email?: string; // vai mandar por email
    phone?: string; // vai mandar para o telefone
}

export interface CreateUserDtoFromGoogle
    extends Omit<
    CreateUserDto,
    'cpf' | 'password' | 'confirmPassword' | 'phone' | 'birthdate' 
    >{}


export interface CadastralUpdateFromGoogleSource {
    cpf: string;
    phone: string;
}

export interface ForgotPasswordCodeRequest{
    email: string;
}

export interface VerifyUserEmailRequest {
    email: string;
    code: string;
}

export interface ForgotPasswordCodeVerifyRequest {
    email: string;
    code: string;
    password:string;
    passwordConfirmation: string;
}

export interface UserDeleteResonDTO{
    reason: string;
}

export interface Item {
    id_cliente: number;
    dataInicio: string;
    nome: string;
    origem: string;
    nickname: string;
    observacao: string;
    valorFicha: string;
    status: string;
    ultimaAtualizacao: string;
  }
  
 export  interface Historico {
    id_historico: number;
    mensagem: string;
    data: string;
    horario: string;
    id_cliente: number;
  }
  
  export interface Deposito {
    id_deposito: number;
    data: string;
    hora: string;
    valorReais: string;
    valorFichas: string;
    id_cliente: number;
  }

  export interface VerifyUserPhoneRequest {
    code: string
  }
  
  export interface Credentials {
    password: string;
    salt: string;
  }

  export interface CreateUserDeleteReasonDTO {
    reason:string;
    confirmEmail:string;
  }

  export interface ValidateForgotPasswordCodeRequest{
    email: string;
    code: string;
  }

  export interface VerifyUserEmailRequest {
    code: string;
  }

  export interface ChangePasswordRequest {
    email: string;
    code: string;
    password: string;
    passwordConfirmation: string;
  }

  export interface UserDeleteResonDTO {
    reason: string;
  }