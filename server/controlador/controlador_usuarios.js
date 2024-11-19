import { User } from "../db";

const pegarUsuarioFuncao = async (req, res) => {
    const id_requisicao = req.params.id
    const user = await User.findBypk(id_requisicao)
    if (!user) {
        res.status(404).send('User not found')
        return
    }
    res.send(user)
}

export { pegarUsuarioFuncao }