let ano: number | string = new Date().getFullYear()
let mes: number | string = new Date().getMonth() + 1
let dia: number | string = new Date().getDate()

ano = ano < 10 ? `0${ano}` : ano
mes = mes < 10 ? `0${mes}` : mes
dia = dia < 10 ? `0${dia}` : dia

const dataFormatada = `${dia}/${mes}/${ano}`

export default dataFormatada
