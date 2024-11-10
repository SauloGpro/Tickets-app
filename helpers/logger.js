import winston from "winston";

const logger = winston.createLogger({
    lever: 'error',
    format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'inflo.log', level: 'info'}),
    ],

});

export default logger;