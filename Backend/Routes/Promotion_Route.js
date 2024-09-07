import express from 'express';
import { Promotion } from '../Model/Promotion.js';

const router = express.Router();

// Create a new promotion
router.post('/', async (req, res) => {
    try {
        const { title, description, discount, startDate, endDate,includes } = req.body;

        if (!title || !description || discount === undefined || !startDate || !endDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const promotion = new Promotion({ title, description, discount, startDate, endDate,includes });
        await promotion.save();
        res.status(201).json(promotion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all promotions
router.get('/', async (req, res) => {
    try {
        const promotions = await Promotion.find();
        res.json(promotions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single promotion by ID
router.get('/:id', async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id);
        if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
        res.json(promotion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a promotion by ID
router.patch('/:id', async (req, res) => {
    try {
        const { title, description, discount, startDate, endDate,includes } = req.body;

        const promotion = await Promotion.findById(req.params.id);
        if (!promotion) return res.status(404).json({ message: 'Promotion not found' });

        if (title) promotion.title = title;
        if (description) promotion.description = description;
        if (discount !== undefined) promotion.discount = discount;
        if (startDate) promotion.startDate = startDate;
        if (endDate) promotion.endDate = endDate;

        await promotion.save();
        res.json(promotion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a promotion by ID
router.delete('/:id', async (req, res) => {
    try {
        const promotion = await Promotion.findByIdAndDelete(req.params.id);
        if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
        res.json({ message: 'Promotion deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
