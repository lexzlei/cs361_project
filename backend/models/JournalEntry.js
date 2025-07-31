import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
  entry: { type: String, required: true },
  reflection: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);
export default JournalEntry;