import  Express  from "express"
import cors from "cors"
import { rotas_usuarios } from "../routes/rotas_usuarios.js"
import { rotas_autenticacao } from "../routes/rotas_autenticacao.js"
import perfilRoutes from "../routes/perfil.js"

const app = Express()
app.use(Express.json())

app.use(cors())


criarTabelas()
app.use('/autenticacao', rotas_autenticacao)
app.use('/usuario', rotas_usuarios)
app.use('/perfil', perfilRoutes)

app.listen(8000)