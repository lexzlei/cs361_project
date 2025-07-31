import express from 'express';
import JournalEntry from './models/JournalEntry.js';

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const { entry, reflection } = req.body;

    const newEntry = new JournalEntry({
      entry,
      reflection
    });

    await newEntry.save();
    res.status(201).json({ message: 'Journal entry saved successfully' });
  } catch (err) {
    console.error('Error saving journal entry:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const entries = await JournalEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
