import express from 'express';
import mongoose from 'mongoose';

import { Customer } from '../Model/Customer.js';

const router = express.Router();

// Create a new customer
router.post('/', async (request, response) => {
    try {
        const newCustomer = {
            cusID:request.body.cusID,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            NIC: request.body.NIC,
            phone: request.body.phone,
            email: request.body.email,
             password: request.body.password,
        };

        const customer = await Customer.create(newCustomer);

        return response.status(201).send(customer);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get all customers

router.get('/', async (request, response) => {
    try {
        const customers = await Customer.find({});

        return response.json(customers);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get a single customer

router.get('/:id', async (request, response) => {
    try {
        const customer = await Customer.findById(request.params.id);

        if (!customer) return response.status(404).send({ message: 'Customer not found' });

        return response.json(customer);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a customer

router.put('/:id', async (request, response) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true }
        );

        if (!customer) return response.status(404).send({ message: 'Customer not found' });

        return response.json(customer);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a customer

router.delete('/:id', async (request, response) => {
    try {
        const customer = await Customer.findByIdAndDelete(request.params.id);

        if (!customer) return response.status(404).send({ message: 'Customer not found' });

        return response.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/cLogin', async (request, response) => {
    try {
        const { cusID, password } = request.body;
        if (!cusID || !password) {
            return response.status(400).json({ message: 'cusID and password are required' });
        }
        const customer = await Customer.findOne({ cusID });
        if (!customer) {
            return response.status(404).json({ message: 'User not found' });
        }
        if (password !== customer.password) {
            return response.status(401).json({ message: 'Incorrect password' });
        }
        response.status(200).json(customer);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;