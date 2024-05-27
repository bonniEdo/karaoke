const Redis = require('ioredis');
const connectRedis = async () => {
    let redis = new Redis({
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        db: 0,
    })
    redis.on('connect', function () {
        console.log('Connected to Redis');
    });
    redis.on('error', function (err) {
        console.log('Error ' + err);
    });
};


module.exports = connectRedis