import express from 'express'
import { pegarUsuarioFuncao } from '../controlador/controlador_usuarios'

const rotas_usuarios = express.Router()

rotas_usuarios.get('/:id', pegarUsuarioFuncao)

export { rotas_usuarios }
