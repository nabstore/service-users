import { Produto } from "../../models/index";
import fs from "fs";

const index = async (req, res) => {
  // #swagger.tags = ['Produtos']
  // #swagger.summary = 'Retorna uma lista com todos os produtos.'
  const page = req.query.page ? req.query.page : 1;
  try {
    const produtos = await Produto.findAll({
      limit: 10,
      offset: (page - 1) * 10,
    });
    res.status(200).send(produtos);
  } catch (error) {
    res.status(500).send(error);
  }
};

const offers = async (req, res) => {
  // #swagger.tags = ['Produtos']
  // #swagger.summary = 'Retorna uma lista com os três produtos mais baratos.'
  try {
    const produtos = await Produto.findAll({
      order: [['preco', 'DESC']],
      limit: 4,
    });
    res.status(200).send(produtos);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res, next) => {
  // #swagger.tags = ['Produtos']
  // #swagger.summary = 'Cria um novo produto.'
  // #swagger.consumes = ['multipart/form-data']
  /* #swagger.parameters['singleFile'] = {
            in: 'formData',
            name: 'imagem',
            type: 'file',
            required: 'false',
            description: 'Imagem em formato PNG.',
        } 
    */

  const produto = {
    nome: req.body.nome,
    preco: req.body.preco,
    estoque: req.body.estoque,
    descricao: req.body.descricao,
  };

  try {
    const newProduto = await Produto.create(produto);

    if (req.file) {
      const originalFileName = req.file.originalname;
      const path = `public/uploads/${newProduto.id}`;
      fs.mkdirSync(path);
      fs.renameSync(`tmp/${originalFileName}`, `${path}/image.png`);
    }

    res.status(201).json(newProduto);
  } catch (error) {
    res.status(400).send(error);
  }
};

const read = async (req, res) => {
  // #swagger.tags = ['Produtos']
  // #swagger.summary = 'Retorna os dados de um produto dado seu ID.'
  const id = req.params.id;
  try {
    const produto = await Produto.findOne({
      where: {
        id,
      },
    });

    if (!produto) {
      return res.status(404).send({
        error: `Produto ${id} não encontrado`,
      });
    }

    res.status(200).send(produto);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  // #swagger.tags = ['Produtos']
  // #swagger.summary = 'Edita os dados de um produto dado seu ID.'
  const id = req.params.id;

  try {
    let produto = await Produto.findOne({ where: { id } });

    if (!produto) {
      return res.status(404).send({
        error: `Produto ${id} não encontrado`,
      });
    }

    produto = produto.toJSON();

    if (req.body.nome) {
      produto.nome = req.body.nome;
    }

    if (req.body.preco) {
      produto.preco = req.body.preco;
    }

    if (req.body.estoque) {
      produto.estoque = req.body.estoque;
    }

    if (req.body.descricao) {
      produto.descricao = req.body.descricao;
    }

    await Produto.update(produto, { where: { id } });
    res.status(200).send(produto);
  } catch (error) {
    res.status(400).send(error);
  }
};

const del = async (req, res) => {
  // #swagger.tags = ['Produtos']
  // #swagger.summary = 'Deleta um produto dado seu ID.'
  const id = req.params.id;

  try {
    const affectedLines = await Produto.destroy({ where: { id } });

    if (affectedLines === 1) {
      res.status(200).send();
    } else {
      return res.status(404).send({
        error: `Produto ${id} não encontrado`,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getImage = (req, res) => {
  // #swagger.tags = ['Produtos']
  // #swagger.summary = 'Retorna a imagem de um produto.'
  const produtoId = req.params.id;
  res.sendFile(`/usr/app/public/uploads/${produtoId}/image.png`);
};

export default { index, create, read, update, del, getImage, offers };
