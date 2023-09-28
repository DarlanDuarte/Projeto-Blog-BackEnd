"use strict";Object.defineProperty(exports, "__esModule", {value: true});let ano = new Date().getFullYear()
let mes = new Date().getMonth() + 1
let dia = new Date().getDate()

ano = ano < 10 ? `0${ano}` : ano
mes = mes < 10 ? `0${mes}` : mes
dia = dia < 10 ? `0${dia}` : dia

const dataFormatada = `${dia}/${mes}/${ano}`

exports. default = dataFormatada
