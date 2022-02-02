import { v4 as uuidv4 } from 'uuid';

let users = []

const index = (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Retorna uma lista com todos os usuários.'
    res.status(200).send(users);
};

const create = (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Cria um novo usuário.'
    const user = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    users.push(user);
    res.status(201).send(user);
};

const read = (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Retorna os dados de um usuário dado seu ID.'
    const id = req.params.id;
    const user = users.find( (user) => user.id === id);

    if (!user) {
        res.status(404);
        res.send({ error: "User not found." });
        return
    }

    res.status(200).send(user);
};

const update = (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Edita os dados de um usuário dado seu ID.'
    const id = req.params.id;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        res.status(404);
        res.send({ error: "User not found." });
        return
    }

    if (req.body.email) {
        users[userIndex].email = req.body.email;
    }

    if (req.body.name) {
        users[userIndex].name = req.body.name;
    }

    if (req.body.password) {
        users[userIndex].password = req.body.password;
    }

    res.status(200).send(users[userIndex]);
};

const del = (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Deleta um usuário dado seu ID.'
    const id = req.params.id;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        res.status(404);
        res.send({ error: "User not found." });
        return
    }

    users = users.filter((user) => user.id !== id);
    res.status(200).send()
};

export default { index, create, read, update, del };