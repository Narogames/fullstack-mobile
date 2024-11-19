import { User } from "../db.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const registro_funcao = async (req, res) => {
    try{
      const {nome, sobrenome, email, senha, datanascimento} = req.body 
      if( !nome || !sobrenome || !email || !senha || !datanascimento ) {
        res.send('Todos os campos devem estar preenchidos.')
      }
  
      if(await User.findOne({where :{email:email}})){
        res.status(400).send('Usuário já existe no sistema')
        return
      }
      const senhaSegura = bcryptjs.hashSync(senha, 10)
  
      const novoUsuario = User.create({
        nome :nome,
        sobrenome : sobrenome,
        email : email,
        senha : senhaSegura,
        dataNascimento : datanascimento,
      })
      res.status(201).send({msg:
        'Usuário criado com sucesso.'})
    } catch(err){
  
    }
  }

  const loginfuncao = async (req, res) => {
    //validar informações do login, verfificar se usuário existe, verificar informação de login, token
    try{
      const { email, senha } = req.body
    if (!email || !senha ){
      res.status(400).send('Todos os campos devem estar preenchidos para o login.')
      return
  
    }
    const usuario = await User.findOne({where: {email: email}})
    if (!usuario){
      res.send('Este email não está cadastrado')
      return
    }
    
    const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha)
    if(!senhaCorreta){
      res.send({msg: 'Senha inválida'})
      return
    }
    const token = jwt.sign(
      //payload
      //chave de criptografia
      //tempo de expiração
      {
        nome: usuario.nome,
        email: usuario.email,
        status: usuario.status
      },
      'chavecriptografiasupersegura',
      { expiresIn: "30d" }
    )
    res.send({
      msg: 'Você foi logado',
      token: token
    })
  
    }catch (erro){
      console.log(erro)
      res.status(500).send('Houve um erro.')
    }
    
  }

export { registro_funcao, loginfuncao }