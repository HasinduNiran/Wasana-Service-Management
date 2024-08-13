import express from 'express';

const router = express.Router();

// Create a new feedback
router.post('/', async (req, res) => {
  const { cusID, name, email, phone_number, employee, message, star_rating } = req.body;

  try {
    const newFeedback = new Feedback({ cusID, name, email, phone_number, employee, message, star_rating });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a feedback
router.put('/:id', async (req, res) => {
  const { id: _id } = req.params;
  const feedback = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No feedback with that ID');
  }

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(_id, feedback, { new: true });
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a feedback
router.delete('/:id', async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No feedback with that ID');
  }

  try {
    await Feedback.findByIdAndRemove(_id);
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;