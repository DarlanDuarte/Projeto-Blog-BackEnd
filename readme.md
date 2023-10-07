# Projeto Blog

## Tecnologias do Projeto

**BackEnd:** `NodeJs` - `Express` - `Knex` - `Typescript` - `mysql2` \
**Bibliotecas:** `bcrypt` - `cors` - `dotenv` - `jsonwebtoken` - `multer` - `sucrase` - `nodemon`

### Requisitos para Rodar o Projeto

Esse Projeto Precisa das seguintes Tecnologias

- Nodejs
- Express
- knex
- mysql2

### Como Rodar Na minha Máquina

- **Clone o Projeto:** `git clone https://github.com/DarlanDuarte/Projeto-Blog-BackEnd.git`

- **Rode** `npm install`
- **Rode** `npm run dev`
- **Pronto** 🚀

## Recursos do Projeto

- **Sistema de Autenticação e Autorização**
- **CRUD de Usuário**
- **CRUD das Postagens**
- **Criação de Comentário na Postagem**
- **Pegando Comentários das Postagens**
- **Data de criação da postagem**
- **Pegando Imagens do Post Através da Biblioteca Multer**
- **Salvando imagens no googleDrive usando o Googleapis**

## Referências

- **[Users](#API-USERS)**

  - [GetUser](#Pegando-Usuários)
  - [CreateUser](#Criando-Usuários)
  - [Update and Delete](#Delete-e-Update-Usuário)

---

- **[Authentication](#AUTHENTICATION)**

  - [Login](#Login)
  - [Profile](#Verificação-de-Rota)

---

- **[POSTS](#POSTS)**

  - [CreatePost](#Criando-Posts)
  - [GetPostUser](#Pegando-Posts-do-Usuáio)
  - [GetAllPost](#Pegando-todos-os-Posts)
  - [GetPostById](#Pegando-posts-pelo-Id)

  - [DeletePost](#Deletando-Posts)
  - [UpdatePost](#Atualizando-Posts)

---

- **[Comentários](#Comentários)**

  - [Create Comment](#Criando-Comentários)
  - [GetCommentBydId](#)

---

## API-USERS

### Pegando Usuários

```http
GET /user
```

---

### Criando Usuários

```http
POST /user
```

| Body       | Tipo     | Descrição            | Obrigatório |
| :--------- | :------- | :------------------- | :---------- |
| `name`     | `string` | **Nome do Usuário**  | true        |
| `email`    | `string` | **Email do Usuário** | true        |
| `password` | `string` | **Senha do Usuário** | true        |

---

### Delete e Update Usuário

```http
DELETE /user/:id
```

| Parâmetro | Tipo     | Descrição         | Obrigatório |
| :-------- | :------- | :---------------- | :---------- |
| `id`      | `string` | **Id do Usuário** | true        |

```http
PUT /user/:id
```

| Parametro | Tipo               | Descrição         | Obrigatório |
| :-------- | :----------------- | :---------------- | :---------- |
| `id`      | `string ou number` | **Id do Usuário** | true        |

| Body       | Tipo     | Descrição            | Obrigatório |
| :--------- | :------- | :------------------- | :---------- |
| `name`     | `string` | **Nome do Usuário**  | true        |
| `email`    | `string` | **Email do Usuário** | true        |
| `password` | `string` | **Senha do Usuário** | true        |

---

---

## AUTHENTICATION

### Login

---

```http
POST /login
```

| Body       | Tipo     | Descrição            | Obrigatório |
| :--------- | :------- | :------------------- | :---------- |
| `email`    | `string` | **Email do Usuário** | true        |
| `password` | `string` | **Senha do Usuário** | true        |

---

### Verificação de Rota

```http
GET /profile
```

Verificão de Rota Autorizada!

---

---

## POSTS

### Criando Posts

```http
POST /posts
```

| Authorization   | Tipo               | Descrição                                  | Obrigatório |
| :-------------- | :----------------- | :----------------------------------------- | :---------- |
| `Authorization` | `string`           | **JWT**                                    | true        |
| `id`            | `number ou string` | **Id do Usuário passado no authorization** | true        |

| FormData      | Tipo     | Descrição             | Obrigatório |
| :------------ | :------- | :-------------------- | :---------- |
| `title`       | `string` | **Titulo do Post**    | true        |
| `description` | `string` | **Descrição do Post** | true        |
| `image`       | `file`   | **Imagem do Post**    | false       |

### Pegando Posts do Usuáio

```http
GET /user/posts
```

| LocalStorage    | Tipo               | Descrição                                  | Obrigatório |
| :-------------- | :----------------- | :----------------------------------------- | :---------- |
| `Authorization` | `string`           | **JWT**                                    | true        |
| `id`            | `number ou string` | **Id do Usuário passado no authorization** | true        |

### Pegando todos os Posts

```http
GET /posts
```

Pegando todos os posts

### Pegando posts pelo Id

```http
GET /posts/id
```

| Parametro | Tipo     | Descrição         | Obrigatório |
| :-------- | :------- | :---------------- | :---------- |
| `id`      | `string` | **Id do Usuário** | true        |

### Deletando Posts

```http
DELETE /posts/id
```

| Authorization   | Tipo               | Descrição                                  | Obrigatório |
| :-------------- | :----------------- | :----------------------------------------- | :---------- |
| `Authorization` | `string`           | **JWT**                                    | true        |
| `id`            | `number ou string` | **Id do Usuário passado no authorization** | true        |

### Atualizando Posts

```http
UPDATE /posts/id
```

| Authorization   | Tipo               | Descrição                                  | Obrigatório |
| :-------------- | :----------------- | :----------------------------------------- | :---------- |
| `Authorization` | `string`           | **JWT**                                    | true        |
| `id`            | `number ou string` | **Id do Usuário passado no authorization** | true        |

| body          | Tipo     | Descrição             | Obrigatório |
| :------------ | :------- | :-------------------- | :---------- |
| `title`       | `string` | **Titulo do Post**    | true        |
| `description` | `string` | **Descrição do Post** | true        |

| parametro | Tipo     | Descrição      | Obrigatório |
| :-------- | :------- | :------------- | :---------- |
| `id`      | `string` | **Id do Post** | true        |

### Comentários

## Criando Comentários

```http
POST /posts/comment/id
```

| LocalStorage    | Tipo               | Descrição                                    | Obrigatório |
| :-------------- | :----------------- | :------------------------------------------- | :---------- |
| `Authorization` | `string`           | **JWT**                                      | true        |
| `id`            | `number ou string` | **Id do Usuário passado no Authorization**   | true        |
| `name`          | `string`           | **Nome do Usuário Passado no Authorization** | true        |

| parametro | Tipo     | Descrição      | Obrigatório |
| :-------- | :------- | :------------- | :---------- |
| `id`      | `string` | **Id do Post** | true        |

| body         | Tipo     | Descrição      | Obrigatório |
| :----------- | :------- | :------------- | :---------- |
| `Comentário` | `string` | **Comentário** | true        |

## Pegando Comentários do Post

```http
GET /posts/comment/id
```

| parametro | Tipo     | Descrição      | Obrigatório |
| :-------- | :------- | :------------- | :---------- |
| `id`      | `string` | **Id do Post** | true        |

## Sobre mim 💬

Eu sou Darlan Melo Duarte, um desenvolvedor fullstack apaixonado por tecnologia. Meu Aprendizado no mundo da programação me permitiu aprender tanto o desenvolvimento front-end quanto o back-end.

Minha abordagem é transformar ideias em soluções práticas e funcionais, sempre buscando a excelência na experiência do usuário. A cada dia, procuro aprender e me atualizar para oferecer o que há de mais recente em tecnologia aos meus projetos.

## Sobre o Projeto 🧠

Este projeto foi desenvolvido por minha própria iniciativa, representando uma oportunidade valiosa para o aprimoramento das minhas habilidades. Trata-se de um blog que engloba tanto o desenvolvimento do backend quanto do frontend, servindo como um exemplar prático do meu atual conhecimento em programação.

Estou extremamente satisfeito com os resultados obtidos, pois este projeto me proporcionou uma curva de aprendizado significativa. Através dele, pude expandir meu domínio sobre diversas tecnologias e aprofundar minha compreensão dos princípios fundamentais da programação.

O processo de criação deste blog demonstrou minha capacidade de transformar conceitos em soluções funcionais e esteticamente agradáveis. Estou entusiasmado em continuar aplicando essa expertise em projetos futuros, contribuindo de forma significativa para o mundo da tecnologia.

## Contato 👩‍💻

<div>

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)]()
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/darlan-melo-492927288/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DarlanDuarte)

</div>
