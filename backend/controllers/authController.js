const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!password) return res.status(400).json({ msg: "Password wajib diisi" });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        await User.create({
            name, email, password: hashPassword, role: "user"
        });

        res.json({ msg: "Register Berhasil! Silakan Login." });
    } catch (error) {
        console.log(error);
        // Tangani error email kembar
        if(error.name === 'SequelizeUniqueConstraintError') {
             return res.status(400).json({ msg: "Email sudah terdaftar!" });
        }
        res.status(500).json({ msg: "Error Server" });
    }
}

// 2. LOGIN
const login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(404).json({ msg: "Email tidak ditemukan" });

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ msg: "Password Salah!" });

        // Update Waktu Login Terakhir
        await User.update({ lastLogin: new Date() }, { where: { id: user.id } });

        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const role = user.role;

        const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET || 'rahasia123', {
            expiresIn: '1d' 
        });

        res.json({ accessToken, name, email, role });

    } catch (error) {
        res.status(404).json({ msg: "Email tidak ditemukan" });
    }
}

// 3. GET ME (Ambil Data User Terbaru: XP, Level)
const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId, {
            attributes: ['id', 'name', 'email', 'role', 'xp', 'level']
        });
        if(!user) return res.status(404).json({msg: "User not found"});
        res.json(user);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

module.exports = { register, login, getMe };