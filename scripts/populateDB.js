import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

mongoose.connect("mongodb://localhost:27017/ticketapp-db")
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log('Connection failed', err));

const users = [
    { name: "user", role: "user", email: "user@email.com", password: "12345678" },
    { name: "admin", role: "admin", email: "admin@email.com", password: "12345678" }
];

const status = ['open', 'closed'];
const priority = ['low', 'medium', 'high'];

// Elimina todos los usuarios y tickets de la base de datos
async function deleteCollection() {
    await User.deleteMany({});
    console.log('Users have been deleted');
    await Ticket.deleteMany({});
    console.log('Tickets have been deleted');
}

// Crea usuarios de prueba
async function createUsers() {
    for (const userData of users) {
        const user = new User(userData);
        await user.save();
    }
}

// Crea tickets de prueba
async function createTickets() {
    const users = await User.find();

    for (let i = 0; i < 15; i++) {
        const ticket = new Ticket({
            tittle: `Ticket #${i}`,
            description: `This is a description for ticket #${i}`,
            status: status[Math.floor(Math.random() * status.length)],
            priority: priority[Math.floor(Math.random() * priority.length)],
            user: users[Math.floor(Math.random() * users.length)].id
        });

        await ticket.save();
    }
}

// Ejecuta el proceso de poblar la base de datos
async function populateDB() {
    await deleteCollection();
    await createUsers();
    await createTickets();
    console.log('Database populated');
    mongoose.disconnect();
}

populateDB();
