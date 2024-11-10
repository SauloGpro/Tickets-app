import Joi from 'joi';

const ticketSchema = Joi.object({
    user: Joi.string().required(),  // ID de usuario obligatorio
    tittle: Joi.string().required(),  // Título del ticket obligatorio
    description: Joi.string().required(),  // Descripción obligatoria
    priority: Joi.string().valid('low', 'medium', 'high').required(),  // Prioridad con valores válidos
    status: Joi.string().valid('open', 'in-progress', 'closed')  // Estado con valores válidos
});

export default ticketSchema;  // Exporta el esquema de validación para su uso en rutas
