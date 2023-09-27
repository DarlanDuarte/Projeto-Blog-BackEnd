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

export interface IPosts {
  id: number | string
  userId: number | string
  title: string
  description: string
  createAt: string
  image: string | null
}

export interface IUpdatePost {
  postId: number
  userId: number | string
  title: string
  description: string
}
