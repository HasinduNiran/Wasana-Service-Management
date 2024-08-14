import express from 'express';
import { Applicant } from '../Model/Applicant.js';

const router = express.Router();

// Create a new applicant
router.post('/', async (req, res) => {
    try {
        const applicant = new Applicant(req.body);
        await applicant.save();
        res.status(201).json(applicant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get a single applicant by ID
router.get('/:id', getApplicant, (req, res) => {
    res.json(res.applicant);
});

async function getApplicant(req, res, next) {
    let applicant;

    try {
        applicant = await Applicant.findById(req.params.id);
        if (!applicant) {
            return res.status(404).json({ message: 'Cannot find applicant' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.applicant = applicant;
    next();
}

// Update an existing applicant
router.put('/:id', getApplicant, async (req, res) => {
    if (req.body.FirstName != null) {
        res.applicant.FirstName = req.body.FirstName;
    }
    if (req.body.LastName != null) {
        res.applicant.LastName = req.body.LastName;
    }
    if (req.body.Number != null) {
        res.applicant.Number = req.body.Number;
    }
    if (req.body.Email != null) {
        res.applicant.Email = req.body.Email;
    }
    if (req.body.JobType != null) {
        res.applicant.JobType = req.body.JobType;
    }
    if (req.body.Message != null) {
        res.applicant.Message = req.body.Message;
    }

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
