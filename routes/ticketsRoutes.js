import express from 'express';
import Ticket from '../models/Ticket.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import buildFilter from '../middlewares/filter.js';
import pagination from '../middlewares/pagination.js';
import ticketSchema from '../validations/ticketValidation.js';
import { validate } from 'uuid';


const router = express.Router();

//nos devuelve todos los tickets
router.get("/", buildFilter, pagination(Ticket), async (req, res) => { 
    
        res.status(200).json(req.pagination.results);
})

//pedir ticket por id
router.get("/:id", async (req, res) => {
    try {
        const ticket = await Ticket.findOne({id: req.params.id});

        if(!ticket) return res.status(404).json({message: "Ticket not found"});

        res.status(200).json({ticket: ticket});
        
        
    } catch (error) {
        res.status(500).json({message: "Server error" + error.message});
        
    }
})

//modificar tickets
router.put("/:id", auth,  async (req, res) => {
    const update = req.body;

    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, update, {new: true});
        if(!ticket) return res.status(404).json({message: "Not found"});
        res.status(200).json({ticket: ticket});
        
    } catch (error) {
        res.status(500).json({message: "Server error" + error.message});
    }
})

//crear ticket
router.post('/', auth, async (req, res) => {
    const {error} = ticketSchema.validate(req.body);

    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    
    const ticket = new Ticket({
        "user": req.user._id,
        "tittle": req.body.tittle,
        "description": req.body.description,
        "priority": req.body.priority,
        "status": req.body.status
    });
    try {
        const newTicket = await ticket.save();
        res.status(201).json({ticket: newTicket})
        
    } catch (error) {
        res.status(500).json({Message: "Server error" + error.message});
        
    }
});

//borrar tickets
router.delete("/:id", [auth, admin], async (req, res) => {
    try {
        const ticket = await Ticket.findOneAndDelete({id: req.params.id});

        if(!ticket) return res.status(404).json({message: "Not found"});

        res.status(200).json({ticket: ticket});
   
    } catch (error) {
        res.status(500).json({Message: "Server error" + error.message});
        
    }
});

export default router;