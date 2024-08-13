import express from 'express';
import { Repair } from '../Model/Repair.js';

const router = express.Router();

// Route for saving new repair
router.post('/', async (req, res) => {
    try {
        const repair = new Repair(req.body);
        await repair.save();
        res.status(201).json(repair);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for getting all repairs
router.get('/', async (req, res) => {
    try {
        const repairs = await Repair.find();
        res.json(repairs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for getting repair by id
router.get('/:id', getRepair, (req, res) => {
    res.json(res.repair);
});

// Route for updating repair by id
router.put('/:id', getRepair, async (req, res) => {
    if (req.body.status) {
        res.repair.status = req.body.status;
    }
    if (req.body.description) {
        res.repair.description = req.body.description;
    }
    try {
        await res.repair.save();
        res.json(res.repair);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for deleting repair by id
router.delete('/:id', getRepair, async (req, res) => {
    try {
        await res.repair.remove();
        res.json({ message: 'Repair deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

// Middleware to get repair by ID
async function getRepair(req, res, next) {
    let repair;
    try {
        repair = await Repair.findById(req.params.id);
        if (repair == null) {
            return res.status(404).json({ message: 'Cannot find repair' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.repair = repair;
    next();
}
