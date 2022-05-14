const WebSocket = require('ws');

const connectWebSocket = server => {
    const wss = new WebSocket.Server({ server: server, path: '/websockets' });
    wss.on('connection', ws => {
        ws.on('message', data => {
            // 取得所有連接中的 client
            const clients = wss.clients;
            // 發送訊息至每個 client
            clients.forEach(client => {
                client.send(data);
            })
        })
        ws.on('close', () => {
            console.log('close connected');
        })
    });
};

module.exports = connectWebSocket;