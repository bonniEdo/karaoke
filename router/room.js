const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = '1234'; // 密鑰密碼

let nextRoomId = 1;
const rooms = {};


router.get("/", (req, res) => {
    const roomId = nextRoomId++;
    const room = {
        id: roomId,
        createdAt: new Date()
    }
    // 
    // rooms[roomId] = room;

    // 生成 token
    const token = jwt.sign({ roomId: room.id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ roomId: room.id, token });
})




module.exports = router;