const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'MetaWall API',
    description: 'MetaWall 生成文件',
  },
  host: 'localhost:3000', //"https://peaceful-citadel-43202.herokuapp.com", // 部屬時要要填部屬時的網址
  schemes: ['http', 'https'],
  securityOefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT Authorization',
    },
  },
};

const outputFile = './swagger-output.json'; // 生成路徑
const endpointsFiles = ['./app.js']; // 讀取檔案

swaggerAutogen(outputFile, endpointsFiles, doc);
