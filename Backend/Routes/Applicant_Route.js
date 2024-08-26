import express from 'express';
import { Applicant } from '../Model/Applicant.js';

const router = express.Router();

// Create a new applicant
router.post('/', async (req, res) => {
    try {
        const { FirstName, LastName, Number, Email, JobType, image } = req.body;

        // Checking if all required fields are present in the request body
        if (!FirstName || !LastName || !Number || !Email || !JobType || !image) {
            return res.status(400).send({ message: 'Please provide all required fields' });
        }

        // Creating a new Applicant item with the provided data
        const newApplicant = {
            cusID: req.body.cusID,
            FirstName,
            LastName,
            Number,
            Email,
            JobType,
            image
        };

        // Adding the new Applicant item to the database
        const createdApplicant = await Applicant.create(newApplicant);

        // Sending the created Applicant item as a JSON response
        return res.status(201).send(createdApplicant);
    } catch (error) {
        // Handling errors and sending an error response
        console.error(error.message);
        return res.status(500).send({ message: 'Error creating new applicant' });
    }
});

// Get a single applicant by ID
router.get('/:id', getApplicant, (req, res) => {
    res.json(res.applicant);
});

async function getApplicant(req, res, next) {
    try {
        const applicant = await Applicant.findById(req.params.id);
        if (!applicant) {
            return res.status(404).json({ message: 'Cannot find applicant' });
        }
        res.applicant = applicant;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Update an existing applicant
router.put('/:id', getApplicant, async (req, res) => {
    const { FirstName, LastName, Number, Email, JobType, image } = req.body;

    if (FirstName != null) res.applicant.FirstName = FirstName;
    if (LastName != null) res.applicant.LastName = LastName;
    if (Number != null) res.applicant.Number = Number;
    if (Email != null) res.applicant.Email = Email;
    if (JobType != null) res.applicant.JobType = JobType;
    if (image != null) res.applicant.image = image;

    try {
        const updatedApplicant = await res.applicant.save();
        res.json(updatedApplicant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all applicants
router.get('/', async (req, res) => {
    try {
        const applicants = await Applicant.find();
        res.json(applicants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete an applicant
router.delete('/:id', async (req, res) => {
    try {
        const applicant = await Applicant.findByIdAndDelete(req.params.id);
        if (!applicant) {
            return res.status(404).json({ message: 'Cannot find applicant' });
        }
        res.json({ message: 'Applicant deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
