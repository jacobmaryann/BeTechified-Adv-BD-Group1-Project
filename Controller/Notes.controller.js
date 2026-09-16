const mongoose = require('mongoose');
const Joi = require('joi');
const NotesModel = require('../Models/NoteModel.js');
const updateNoteSchema = Joi.object({
    title: Joi.string().optional(),
    content: Joi.string().optional(),
    category: Joi.string().optional(),
    tags: Joi.string()
        .valid('work', 'personal', 'urgent', 'others')
        .optional()
});

const createNote = async (req, res) => {
};

const getAllNotes = async (req, res) => {
};

const getNoteById = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid note ID format"
            });
        }

        const note = await NotesModel.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(note);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
44 const updateNoteById = async (req, res) => {
45     try {
46         if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
47             return res.status(400).json({
48                 message: "Invalid note ID format"
49             });
50         }
51
52         const { error, value } = updateNoteSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const updatedNote = await NotesModel.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(updatedNote);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteNoteById = async (req, res) => {
};

module.exports = { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById };