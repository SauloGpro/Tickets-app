import jwt from 'jsonwebtoken';

// Middleware para verificar que el usuario esté autenticado
export default function auth(req, res, next){
    const token = req.header('Authorization').replace("Bearer ", "");

    // Verifica que el token esté presente
    if(!token) return res.status(401).send("Acceso denegado");

    try {
        // Verifica y decodifica el token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Token inválido");
    }
}
