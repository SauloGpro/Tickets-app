import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Ruta para el registro de usuarios
router.post("/signup", async (req, res) => {
    let user;
    user = await User.findOne({ email: req.body.email });

    if(user) return res.status(400).send('El usuario ya está registrado');

    // Creación del usuario
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    try {
        // Guardado en la base de datos y generación del token JWT
        await user.save();
        const token = jwt.sign({
            _id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.header('Authorization', token).send({
            user: {
                name: user.name,
                role: user.role,
                email: user.email
            },
            token,
        });

    } catch (error) {
        res.status(500).send('Algo salió mal');
    }
});

// Ruta para inicio de sesión
router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Contraseña o correo incorrectos');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Contraseña o correo incorrectos');

    const token = jwt.sign({
        _id: user._id,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.header('Authorization', token).send(token);
});

export default router;
