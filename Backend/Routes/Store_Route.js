import express from 'express';
import { Store } from '../Model/Store.js';

const router = express.Router();

// Create a new store
router.post('/', async (req, res) => {
    try {
        const store = new Store(req.body);
        await store.save();
        res.status(201).json(store);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get a single store by ID
router.get('/:id', getStore, (req, res) => {
    res.json(res.store);
});

async function getStore(req, res, next) {
    let store;
    try {
        store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({ message: 'Cannot find store' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.store = store;
    next();
}

// Update an existing store
router.patch('/:id', getStore, async (req, res) => {
    if (req.body.Name != null) {
        res.store.Name = req.body.Name;
    }
    if (req.body.Quantity != null) {
        res.store.Quantity = req.body.Quantity;
    }
    if (req.body.Price != null) {
        res.store.Price = req.body.Price;
    }

    try {
        const updatedStore = await res.store.save();
        res.json(updatedStore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all stores
router.get('/', async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a store
router.delete('/:id', getStore, async (req, res) => {
    try {
        await res.store.remove();
        res.json({ message: 'Store deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
