// Importamos las configuraciones de entorno y la aplicación
import dotenv from "dotenv";
import app from "./app.js";

// Cargamos las variables de entorno
dotenv.config();

// Definimos el puerto a usar desde las variables de entorno o el 3000 por defecto
const port = process.env.PORT || 3000;

// Inicia el servidor en el puerto especificado
const server = app.listen(port, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Server is running on port http://localhost:${port}`);
});

export default server;
