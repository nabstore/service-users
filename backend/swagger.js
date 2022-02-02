const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './src/modules/produtos/routes.js',
    './src/modules/users/routes.js',
    './src/modules/products/routes.js',
    './src/modules/usuarios/routes.js',
    './src/modules/compras/routes.js'
]
const doc = {
    info: {
      version: '1.0.0',
      title: 'Shop API',
      description: 'Primeira API feita na disciplina Programação Web 2.',
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
      },
      {
        name: 'Users',
        description: 'CRUD de usuários.',
      },
      {
        name: 'Products',
        description: 'CRUD de produtos.',
      }
    ],
  };

swaggerAutogen(outputFile, endpointsFiles, doc)