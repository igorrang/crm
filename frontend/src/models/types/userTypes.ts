export enum UserProvider {
  EMAIL_PASSWORD = 'EMAIL_PASSWORD',
  GOOGLE_AUTH = 'GOOGLE_AUTH',
}

export interface CreateUserDto {
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

export interface CreateUserDtoFromGoogle
  extends Omit<
    CreateUserDto,
    'cpf' | 'password' | 'confirmPassword' | 'phone' | 'birthdate'
  > {}

export interface UpdateUserDto {
  email?: string;
  phone?: string;
}

export interface CadastralUpdateFromGoogleSource {
  cpf: string;
  phone: string;
}

export interface UpdateUserBankAccountDto {
  agency: String;
  account: String;
  bankCode: String;
}

export interface VerifyDocumentsDto {
  file01?: {
    name: string;
    base64?: string;
    url?: string;
    contentType?: string;
  };
  file02?: {
    name: string;
    base64?: string;
    url?: string;
    contentType?: string;
  };
}

export interface BankAccount {
  agency: String;
  account: String;
  bankCode: String;
}

export interface Review {
  userId: String;
  stars: Number;
  comment: String;
}

export interface Credentials {
  password: string;
  salt: string;
}

export interface CreateUserDeleteReasonDTO {
  reason: string;
  confirmEmail: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ValidateForgotPasswordCodeRequest {
  email: string;
  code: string;
}

export interface VerifyUserEmailRequest {
  email: string;
  code: string;
}

export interface VerifyUserPhoneRequest {
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
