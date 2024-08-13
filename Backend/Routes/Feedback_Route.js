import express from 'express';

import {Feedback} from '../Model/Feedback.js';

const router = express.Router();

// Create a new feedback

router.post('/', async (req, res) => {
  const {name, email, message} = req.body;

  try {
    const newFeedback = new Feedback({name, email, message});
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({error: error.message});
  }

});

// Get all feedback

router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Update a feedback

router.put('/:id', async (req, res) => {
  const {id: _id} = req.params;
  const feedback = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No feedback with that id');

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(_id, feedback, {new: true});
    res.json(updatedFeedback);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Delete a feedback

router.delete('/:id', async (req, res) => {
  const {id: _id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No feedback with that id');

  try {
    await Feedback.findByIdAndRemove(_id);
    res.json({message: 'Feedback deleted successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default router;
