import { Compra, CompraItem, Produto } from "../../models/index";

const create = async (req, res) => {
  // #swagger.tags = ['Compras']
  // #swagger.summary = 'Realiza uma compra e salva no banco.'
  try {
    const compra = await Compra.create({
      usuarioId: req.body.userId,
      date: new Date(),
    });

    const compraItens = req.body.produtos.map((produto) => ({
      ...produto,
      compraId: compra.id,
    }));

    const novoCompraItens = await CompraItem.bulkCreate(compraItens);

    for (let produto of req.body.produtos) {
      await Produto.decrement(
        { estoque: produto.quantidade },
        {
          where: {
            id: produto.produtoId,
          },
        }
      );
    }

    res.status(201).send({ compra, novoCompraItens });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default { create };
