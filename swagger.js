const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "MetaWall API",
        description: "MetaWall 生成文件"
    },
    host: "localhost:3005",
    schemes: ['http', 'https']
}

const outputFile = './swagger-output.json'; // 生成路徑
const endpointsFiles = ['./app.js']; // 讀取檔案

swaggerAutogen(outputFile, endpointsFiles, doc)