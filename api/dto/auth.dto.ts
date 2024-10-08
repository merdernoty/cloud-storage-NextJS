export interface LoginFormDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
}

export type RegisterFromDTO = LoginFormDTO & { fullname: string };
export type RegisterResponseDTO = LoginResponseDTO;

export interface User {
  id: number;
  email: string;
  fullname: string;
}
