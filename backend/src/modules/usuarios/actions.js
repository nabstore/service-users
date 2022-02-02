import { Usuario, TipoUsuario, Endereco } from "../../models/index";
import bcrypt from "bcrypt";

const index = async (req, res) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Lista todos os usuarios.'
  const tipoUsuarioId = req.query.tipoUsuarioId;

  let whereClause = {};
  if (tipoUsuarioId) {
    whereClause = {
      tipoUsuarioId,
    };
  }

  try {
    const usuarios = await Usuario.findAll({
      where: whereClause,
      include: TipoUsuario,
    });
    res.status(200).send(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Cria um novo usuário com senha encriptada.'
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.senha, salt, async (err, hash) => {
      const usuario = {
        nome: req.body.nome,
        tipoUsuarioId: req.body.tipoUsuarioId,
        email: req.body.email,
        senha: hash,
      };

      try {
        const newUsuario = await Usuario.create(usuario);
        newUsuario.senha = undefined;
        res.status(201).json(newUsuario);
      } catch (error) {
        res.status(400).send(error);
      }
    });
  });
};

const login = async (req, res) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Efetua o login do usuário na aplicação.'
  try {
    const usuario = await Usuario.findOne({
      where: {
        email: req.body.email,
      },
      include: TipoUsuario,
    });

    if (usuario) {
      bcrypt.compare(req.body.senha, usuario.senha, (err, ok) => {
        if (ok) {
          req.session.userId = usuario.id;
          req.session.tipoUsuario = usuario.TipoUsuario.rotulo;
          res.send(usuario);
        } else {
          res.status(401).send({ error: "Email e/ou senha inválido(s)." });
        }
      });
    } else {
      res.status(401).send({ error: "Email e/ou senha inválido(s)sss." });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const logout = (req, res) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Efetua o logout do usuário na aplicação.'
  req.session.destroy((err) => {
    res.send({ msg: "Logout realizado com sucesso." });
  });
};

const getEnderecos = async (req, res) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Lista os endereços de um usuário.'
  const id = req.params.id;

  if (!id) {
    res.status(400).send({ msg: "Informe um ID de usuário." });
  }

  try {
    const enderecos = await Endereco.findAll({
      where: {
        usuarioId: id,
      },
    });

    res.status(200).send(enderecos);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createEndereco = async (req, res) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Cria um novo endereço para um usuário.'
  const id = req.params.id;
  const endereco = {
    usuarioId: id,
    logradouro: req.body.logradouro,
    numero: req.body.numero,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    uf: req.body.uf,
    cep: req.body.cep,
  }
  
  try {
    const newEndereco = await Endereco.create(endereco);
    res.status(200).send(newEndereco);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { index, create, login, logout, getEnderecos, createEndereco };
