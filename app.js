import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import ticketsRoutes from "./routes/ticketsRoutes.js";
import error from "./middlewares/error.js";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "./helpers/rateLimit.js";

// Carga de configuraciones de entorno
dotenv.config();
const app = express();

// Configuración de la URL de la base de datos dependiendo del entorno
const DB_URL = process.env.NODE_ENV === 'test' 
    ? "mongodb://localhost:27017/ticketapp-db-test"
    : process.env.DB_URL || "mongodb://localhost:27017/ticketapp-db";

// Conexión a la base de datos MongoDB
mongoose.connect(DB_URL)
    .then(() => {
        console.log(`Connected to database: ${DB_URL}`);
    })
    .catch((error) => {
        console.error('Not connected', error);
    });

// Middleware para registro de solicitudes HTTP en la consola
app.use(morgan("dev"));

// Middleware para seguridad básica con configuraciones por defecto
app.use(helmet());

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Activar compresión y limitador de tasa en producción
if(process.env.NODE_ENV === "prod"){
    app.use(compression());
    app.use(rateLimit);
}

// Middleware para interpretar JSON en las solicitudes
app.use(express.json());

// Ruta de prueba
app.get('/hello', (req, res) => {
    res.status(200).send("Hello World");
});

// Rutas para usuarios y tickets
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketsRoutes);

// Middleware para manejar errores
app.use(error);

export default app;
