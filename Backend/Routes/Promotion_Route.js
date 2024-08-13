import express from 'express';
import { Promotion } from '../Model/Promotion.js';

const router = express.Router();

// Middleware to get a promotion by ID
async function getPromotion(req, res, next) {
    let promotion;
    try {
        promotion = await Promotion.findById(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.promotion = promotion;
    next();
}

// Create a new promotion
router.post('/', async (req, res) => {
    const { title, description, discount, startDate, endDate } = req.body;

    const promotion = new Promotion({
        title,
        description,
        discount,
        startDate,
        endDate,
    });

    try {
        const newPromotion = await promotion.save();
        res.status(201).json(newPromotion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all promotions
router.get('/', async (req, res) => {
    try {
        const promotions = await Promotion.find();
        res.status(200).json(promotions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single promotion by ID
router.get('/:id', getPromotion, (req, res) => {
    res.json(res.promotion);
});

// Update a promotion by ID
router.patch('/:id', getPromotion, async (req, res) => {
    const { title, description, discount, startDate, endDate } = req.body;

    if (title) res.promotion.title = title;
    if (description) res.promotion.description = description;
    if (discount) res.promotion.discount = discount;
    if (startDate) res.promotion.startDate = startDate;
    if (endDate) res.promotion.endDate = endDate;

    try {
        const updatedPromotion = await res.promotion.save();
        res.json(updatedPromotion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a promotion by ID
router.delete('/:id', getPromotion, async (req, res) => {
    try {
        await res.promotion.remove();
        res.json({ message: 'Promotion deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
