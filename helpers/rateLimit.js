// Limita el número de peticiones que puede hacer un usuario en un tiempo determinado
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
    max: 100 // Límite de 100 peticiones por IP en 15 minutos
});

export default limiter;
