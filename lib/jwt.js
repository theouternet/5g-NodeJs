const jwt = require('jsonwebtoken');

const JWT_KEY = "SECRET";

function encode(payload) {
    const token = jwt.sign(payload, JWT_KEY);
    
    return token;
}

function decode(token) {
    const tokenDecoded = jwt.verify(token, JWT_KEY);

    return tokenDecoded;
}

module.exports = {
    encode,
    decode
};