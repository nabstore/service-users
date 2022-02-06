const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './src/modules/produtos/routes.js',
    './src/modules/usuarios/routes.js',
    './src/modules/compras/routes.js'
]
const doc = {
    info: {
      version: '1.0.0',
      title: 'Nabstore Backend',
      description: 'Backend em monolito da loja Nabstore.',
    },
    host: 'localhost:3020',
    tags: [
      {
        name: 'Usuarios',
        description: 'Rotas de usuários com persistência no banco.',
      },
      {
        name: 'Produtos',
        description: 'CRUD de produtos com banco de dados.',
      },
      {
        name: 'Compras',
        description: 'Criação de compras com banco de dados.',
      }
    ],
  };

swaggerAutogen(outputFile, endpointsFiles, doc)