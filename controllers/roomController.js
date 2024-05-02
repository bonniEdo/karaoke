const jwt = require('jsonwebtoken');
const JWT_SECRET = '1234'; // 密鑰密碼

let nextRoomId = 1;
const roomCreate = (req, res) => {
    res.status(200)
    const roomId = nextRoomId++;
    const room = {
        id: roomId,
        createdAt: new Date()
    }

    // 生成 token
    const token = jwt.sign({ roomId: room.id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ roomId: room.id, token });
}

module.exports = { roomCreate }