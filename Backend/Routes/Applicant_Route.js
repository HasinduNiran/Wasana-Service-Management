import express from 'express';
import { Applicant } from '../Model/Applicant.js';

const router = express.Router();

// Create a new applicant

router.post('/', async (req, res) => {
  const newApplicant = new Applicant({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    resume: req.body.resume
  });

  try {
    const savedApplicant = await newApplicant.save();
    res.json(savedApplicant);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    if (applicant == null) {
      return res.status(404).json({ message: 'Cannot find applicant' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.applicant = applicant;
  next();
}

// Update an existing applicant

router.patch('/:id', getApplicant, async (req, res) => {
  if (req.body.name!= null) {
    res.applicant.name = req.body.name;
  }
  if (req.body.email!= null) {
    res.applicant.email = req.body.email;
  }
  if (req.body.phone!= null) {
    res.applicant.phone = req.body.phone;
  }
  if (req.body.resume!= null) {
    res.applicant.resume = req.body.resume;
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

router.delete('/:id', getApplicant, async (req, res) => {
  try {
    await res.applicant.remove();
    res.json({ message: 'Applicant deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});