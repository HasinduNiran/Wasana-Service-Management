import express from 'express';

import {Promotion} from '../Model/Promotion.js';

const router = express.Router();

// Create a new promotion

router.post('/', async (req, res) => {
  const promotion = new Promotion(req.body);

  try {
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Get all promotions

router.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({message: error.message});
  }

});

// Get a single promotion by ID

router.get('/:id', getPromotion, (req, res) => {
  res.json(res.promotion);
});


// Delete a promotion by ID

router.delete('/:id', getPromotion, async (req, res) => {
    try {
    await res.promotion.remove();
    res.json({message: 'Promotion deleted'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
);

// Update a promotion by ID

router.patch('/:id', getPromotion, async (req, res) => {
  if (req.body.title || req.body.description || req.body.discount) {
    res.promotion.title = req.body.title;
    res.promotion.description = req.body.description;
    res.promotion.discount = req.body.discount;

    try {
      const updatedPromotion = await res.promotion.save();
      res.json(updatedPromotion);
    } catch (error) {
      res.status(400).json({message: error.message});
    }
  }
});