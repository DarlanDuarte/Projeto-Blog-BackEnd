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

export interface ICreateComment {
  userId: number | string | undefined
  postId: number | string
  usuario: string | undefined
  comment: string
}

export interface IComment {
  id: number | string
  userId: number | string
  postId: number | string
  usuario: string
  comment: string
}
