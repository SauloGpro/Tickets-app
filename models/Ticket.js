import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketSchema = new mongoose.Schema(
    {
        id: {
            type: String, 
            default: uuidv4,  // Genera un UUID único por defecto
            required: true
        },
        user: {
            type: String,  // ID de usuario asociado al ticket
            required: true
        },
        createdAt: {
            type: Date, 
            default: Date.now  // Fecha de creación del ticket
        },
        status: {
            type: String, 
            enum: ["open", "in-progress", "closed"],  // Enumera los estados permitidos
            default: "open"
        },
        priority: {
            type: String, 
            enum: ["low", "medium", "high"],  // Enumera los niveles de prioridad permitidos
            default: "low"
        },
        tittle: {
            type: String, 
            required: true  // Título obligatorio
        },
        description: {
            type: String, 
            required: true  // Descripción obligatoria
        },
    },
    {
        toJSON: {
            transform: function(doc, ret) {
                delete ret.__v;  // Elimina la versión y el ID al convertir a JSON
                delete ret.id;
            }
        },
        virtuals: true,  // Habilita virtuales en JSON
    }
);

ticketSchema.index({ id: 1, user: 1 });  // Define un índice para mejorar la búsqueda por ID y usuario

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
