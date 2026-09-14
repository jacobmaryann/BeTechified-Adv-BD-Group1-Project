const mongoose = require('mongoose');
const Joi = require('joi');
const NotesModel = require('../Models/NoteModel.js');
const { AppError } = require('../Middlewares/ErrorHandler.js');

const idSchema = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId validation');

const createNote = async (req, res) => {
};

const getAllNotes = async (req, res) => {
};

const getNoteById = async (req, res) => {
};

const updateNoteById = async (req, res) => {
};

const deleteNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = idSchema.validate(id);
    if (error) {
      return next(new AppError('Invalid note ID format', 400));
    }

    const deletedNote = await NotesModel.findByIdAndDelete(id);

    if (!deletedNote) {
      return next(new AppError('Note not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: deletedNote,
    });
  } catch (err) {
    next(new AppError('Failed to delete note', 500));
  }
};

module.exports = { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById };