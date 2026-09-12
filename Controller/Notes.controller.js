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

exports.createNote = async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;

    if (!title || !content) {
      return next(new AppError('Title and content are required', 400));
    }

    const newNote = await NotesModel.create({ title, content, category, tags });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: newNote,
    });
  } catch (err) {
    next(new AppError('Failed to create note', 500));
  }
};

exports.getNotes = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const search = req.query.search;

    const filter = search ? { $text: { $search: search } } : {};

    const [notes, totalCount] = await Promise.all([
      NotesModel.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
      NotesModel.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message: 'Notes retrieved successfully',
      data: notes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit) || 1,
        totalCount,
        limit,
      },
    });
  } catch (err) {
    next(new AppError('Failed to retrieve notes', 500));
  }
};

exports.deleteNote = async (req, res, next) => {
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