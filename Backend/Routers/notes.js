const notesRouter = require('express').Router();
const notesModel = require('../Models/notesModel');
const userModel = require('../Models/userModel');
const { authenticate } = require('./user');

notesRouter.post('/createNotes', authenticate, async (req, res) => {
    const { title, content } = req.body;

    try {
        // Fetch the user details using the ID from the decoded token
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Proceed with note creation
        const note = await notesModel.create({
            title,
            content,
            author: user._id, // Use the MongoDB `_id` field
        });
        user.notes.push(note._id);
        await user.save();

        res.status(201).json({ message: 'Note created', note });
    } catch (error) {
        res.status(500).json({ message: 'Error creating note', error });
    }
});
notesRouter.get('/readNotes', authenticate, async (req, res) => {
    try {
        // Fetch all notes created by the authenticated user
        const notes = await notesModel.find({ author: req.user.id });

        res.status(200).json({ message: 'Notes retrieved successfully', notes });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notes', error });
    }
});
notesRouter.put('/updateNote/:id', authenticate, async (req, res) => {
    const { id } = req.params; // Note ID
    const { title, content } = req.body; // Updated fields

    try {
        // Find the note by ID and ensure it belongs to the authenticated user
        const note = await notesModel.findOne({ _id: id, author: req.user.id });
        if (!note) {
            return res.status(404).json({ message: 'Note not found or not authorized' });
        }

        // Update the note's fields
        if (title) note.title = title;
        if (content) note.content = content;

        await note.save(); // Save the updated note

        res.status(200).json({ message: 'Note updated successfully', note });
    } catch (error) {
        res.status(500).json({ message: 'Error updating note', error });
    }
});
notesRouter.delete('/deleteNote/:id', authenticate, async (req, res) => {
    const { id } = req.params; // Note ID

    try {
        // Find and delete the note if it belongs to the authenticated user
        const note = await notesModel.findOneAndDelete({ _id: id, author: req.user.id });
        if (!note) {
            return res.status(404).json({ message: 'Note not found or not authorized' });
        }

        // Optionally remove the note ID from the user's `notes` array
        const user = await userModel.findById(req.user.id);
        user.notes = user.notes.filter((noteId) => noteId.toString() !== id);
        await user.save();

        res.status(200).json({ message: 'Note deleted successfully', note });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error });
    }
});

module.exports = notesRouter;
