export interface ICreateUser {
  name: string
  email: string
  senha: string
}

export interface IUser {
  id: number | string
  name: string
  email: string
  password: string
}

export type IJwtPayload = {
  userId: number | string
}
