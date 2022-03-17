const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./src/modules/usuarios/routes.js",
  "./src/modules/enderecos/routes.js",
];
const doc = {
  info: {
    version: "1.0.0",
    title: "Service Users",
    description: "Microsserviço do Time Users.",
  },
  host: "localhost:3021",
  tags: [],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT',
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
