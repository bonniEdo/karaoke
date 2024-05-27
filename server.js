const express = require("express");
const { Server } = require('ws');
const http = require('http');
const app = express();
const server = http.createServer(app);

const wss = new Server({ server });

const jwt = require('jsonwebtoken');
const JWT_SECRET = '1234';

const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
connectDb();

const connectRedis = require("./config/redisConnection");
connectRedis();

const path = require("path");
const PORT = process.env.PORT || 8080;



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
});



//room
app.use("/api/room", require("./router/room"));

//song
app.use("/api/song", require("./router/song"));



server.on('upgrade', function upgrade(request, socket, head) {
    // 从 HTTP 请求头部获取 token
    const token = request.headers['sec-websocket-protocol'];

    if (!token) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }

        // 如果验证通过，继续建立 WebSocket 连接
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });
});
//websoket 
wss.on('connection', function connection(ws) {
    console.log('A user connected');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.on('close', function close() {
        console.log('User disconnected');
    });
});




server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});