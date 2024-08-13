import express from 'express';
import Repair from '../Model/Repair.js';

const router =express.router();

//route for save new repair

router.post('/', async (req, res) => {
    try {
        const repair = new Repair(req.body);
        await repair.save();
        res.status(201).json(repair);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//route for getting all repairs

router.get('/', async (req, res) => {
    try {
        const repairs = await Repair.find();
        res.json(repairs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


});

//route for getting repair by id

router.get('/:id', getRepair, (req, res) => {
    res.json(res.repair);
});

//route for updating repair by id

router.patch('/:id', getRepair, async (req, res) => {
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

//route for deleting repair by id

router.delete('/:id', getRepair, async (req, res) => {
    try {
        await res.repair.remove();
        res.json({ message: 'Repair deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


