import mongoose from "mongoose";
import express from 'express';
import { Vacancy } from '../Model/Vacancy.js';

const router = express.Router();

// Route for creating a new Vacancy
router.post('/', async (request, response) => {
    try {
        const { VacancyID, Name, Description } = request.body;
        if (!Name || !Description) {
            return response.status(400).json({ message: 'Please provide all required fields.' });
        }

        const newVacancy = { VacancyID, Name, Description };
        const vacancy = await Vacancy.create(newVacancy);
        return response.status(201).json(vacancy);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Route for retrieving all Vacancy items from the database
router.get('/', async (request, response) => {
    try {
        const vacancy = await Vacancy.find({});
        response.status(200).json(vacancy);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Route for retrieving a specific Vacancy by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const vacancy = await Vacancy.findById(id);
        if (!vacancy) {
            return response.status(404).json({ message: 'Vacancy not found' });
        }
        response.status(200).json(vacancy);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
});

export default router;
