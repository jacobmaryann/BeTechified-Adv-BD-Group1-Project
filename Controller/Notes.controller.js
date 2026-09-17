const mongoose = require('mongoose');
const Joi = require('joi');
const NotesModel = require('../Models/NoteModel.js');

const createNote = async (req, res, next) => {
    const NoteSchema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        category: Joi.string().optional(),
        tags: Joi.string().valid("work", "personal", "urgent", "others").optional()
    });

    const { error, value } = NoteSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const newNote = new NotesModel({...value, 
            user: req.user._id, });

        console.log(req.user)

        await newNote.save();
        return res.status(200).json({ message: "Note created successfully", data: newNote });
         
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getAllNotes = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    try {
        console.log(`Fetching notes for user: user._id`);
        
        let query = {user: req.user._id} 
        const search = req.query.q;
        if (search) {
            query.$text= { $search: search }
        }
    
            const notes = await NotesModel.find(query).sort({createdAt: -1}).limit(limit).skip(skip).populate('user', 'name _id email');
            return res.status(200).json({ message: "Notes retrieved successfully", data: notes });


    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getNoteById = async (req, res, next) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid Id format"});
        };
        const notes = await NotesModel.findById(req.params.id);

        if(!notes) {
            return res.status(400).json({message: `note with id ${req.params.id} not found` })
        }
          return res.status(201).json(notes);

    } catch (error) {
        console.error(error);
        next();
    }
};

const updateNoteById = async (req, res, next) => {
     const NoteSchema = Joi.object({
        title: Joi.string().optional(),
        content: Joi.string().optional(),
        category: Joi.string().optional(),
        tags: Joi.string().valid("work", "personal", "urgent", "others").optional()
    });

    const {error, value} = NoteSchema.validate(req.body);
if (error) {
    return res.status(400).json({error: error.details[0].message})
}
try {
    const notes = await NotesModel.findById(req.params.id);
    if (!notes) {
        return res.status(404).json({message: `Note wit Id ${req.params.id} not found`})
    }
if (!notes.user.equals(req.user._id)) {
    return res.status(403).json("You are not allowed to make changes to this note")
}

const updatedNote = await NotesModel.findByIdAndUpdate(req.params.id, {...value},
    { new: true,
        runValidators: true
    }
);
if (!updatedNote) {
return res.status(404).json({message: `Note with Id ${req.params.id} not updated`})
}
res.status(200).json({message: `Note with Id ${req.params.id} updated successfully`,
data: updatedNote })
} catch (error) {
    console.error(error);
    next(error);
}
};

const deleteNoteById = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({message: "Invalid Id Format"});
    }
    try {
        const notes = await NotesModel.findById(req.params.id);
        if (!notes) {
            return res.status(404).json({message: `Note with id ${req.params.id} not found`})
        }
        if (!notes.user.equals(req.user._id)) {
            return res.status(403).json("You are not allowed to delete this note")
        }

    await NotesModel.findByIdAndDelete(req.params.id)
    return res.status(200).json({message: `Note with id ${req.params.id} deleted successfully`});

    } catch (error) {
        console.error(error)
        next(error);
    }
};

module.exports = { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById };