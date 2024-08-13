import mongoose from "mongoose";

// Defining the vacancy Schema
const vacancySchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
});

// Exporting the Vacancy Model
export const Vacancy = mongoose.model('Vacancy', vacancySchema);


// Importing the Express library
import express from 'express';
import { Vacancy } from '../Model/Vacancy.js';

// Creating an Express router
const router = express.Router();

// Route for creating a new Vacancy
router.post('/', async (request, response) => {
    try {
        // Validate request body fields
        const { Name, Description } = request.body;

        // Check if all required fields are present and non-empty
        if (!Name || !Description) {
            return response.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Creating a new Vacancy item with the provided data
        const newVacancy = { Name, Description };

        // Adding the new Vacancy item to the database
        const vacancy = await Vacancy.create(newVacancy);

        // Sending the created Vacancy item as a JSON response
        return response.status(201).json(vacancy);
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Route for retrieving all Vacancy items from the database
router.get('/', async (request, response) => {
    try {
        // Fetching all Vacancy items from the database
        const vacancy = await Vacancy.find({});

        // Sending the fetched Vacancy items as a JSON response
        response.status(200).json({
            count: vacancy.length,
            data: vacancy,
        });
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Route for retrieving a specific Vacancy item by ID
router.get('/:id', async (request, response) => {
    try {
        // Extracting the Vacancy item ID from the request parameters
        const { id } = request.params;

        // Fetching a Vacancy item from the database based on the ID
        const vacancy = await Vacancy.findById(id);

        // Check if the Vacancy item exists
        if (!vacancy) {
            return response.status(404).json({ message: 'Vacancy not found' });
        }

        // Sending the fetched Vacancy item as a JSON response
        response.status(200).json(vacancy);
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Route for updating a Vacancy item by ID
router.put('/:id', async (request, response) => {
    try {
        // Extracting the Vacancy item ID from the request parameters
        const { id } = request.params;

        // Find the Vacancy item by ID
        const vacancy = await Vacancy.findById(id);

        if (!vacancy) {
            return response.status(404).json({ message: 'Vacancy not found' });
        }

        // Update the fields of the Vacancy item
        vacancy.Name = request.body.Name || vacancy.Name;
        vacancy.Description = request.body.Description || vacancy.Description;

        // Save the updated Vacancy item
        await vacancy.save();

        // Sending a success response
        return response.status(200).json({ message: 'Vacancy updated successfully', data: vacancy });
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Route for deleting a Vacancy item by ID
router.delete('/:id', async (request, response) => {
    try {
        // Extracting the Vacancy item ID from the request parameters
        const { id } = request.params;

        // Attempting to delete the Vacancy item from the database
        await Vacancy.findByIdAndDelete(id);

        // Sending a success response
        return response.status(200).json({ message: 'Vacancy deleted successfully' });
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Exporting the Express router
export default router;
