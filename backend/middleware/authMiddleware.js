const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ msg: "Belum Login" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'rahasia123', (err, decoded) => {
        if (err) return res.status(403).json({ msg: "Token Salah" });
        
        // Ini kuncinya! Kita tempel data user ke request
        req.user = decoded; 
        next();
    });
};

module.exports = { verifyToken };