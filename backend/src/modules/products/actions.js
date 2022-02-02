import { v4 as uuidv4 } from 'uuid';

let products = []

const index = (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Retorna uma lista com todos os produtos.'
    res.status(200).send(products);
};

const create = (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Cria um novo produto.'
    const product = {
        id: uuidv4(),
        name: req.body.name,
        barcode: req.body.barcode,
        qtd: req.body.qtd,
    };
    products.push(product);
    res.status(201).send(product);
};

const read = (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Retorna os dados de um produto dado seu ID.'
    const id = req.params.id;
    const product = products.find((product) => product.id === id);

    if (!product) {
        res.status(404);
        res.send({ error: "Product not found." });
        return
    }

    res.status(200).send(product);
};

const update = (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Edita os dados de um produto dado seu ID.'
    const id = req.params.id;
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        res.status(404);
        res.send({ error: "Product not found." });
        return
    }

    if (req.body.name) {
        products[productIndex].name = req.body.name;
    }

    if (req.body.barcode) {
        products[productIndex].barcode = req.body.barcode;
    }

    if (req.body.qtd) {
        products[productIndex].qtd = req.body.qtd;
    }

    res.status(200).send(products[productIndex]);
};

const del = (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Deleta um produto dado seu ID.'
    const id = req.params.id;
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        res.status(404);
        res.send({ error: "Product not found." });
        return
    }

    products = products.filter((product) => product.id !== id);
    res.status(200).send()
};

export default { index, create, read, update, del };