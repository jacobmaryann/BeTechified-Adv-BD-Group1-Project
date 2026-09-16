const express = require('express');
const { createNote, getAllNotes, 
    getNoteById, updateNoteById, 
    deleteNoteById } = require('../Controller/Notes.controller.js');
const router = express.Router();
const requireAuth = require('../Middlewares/requireAuth.js')

router.post('/notes', requireAuth, createNote);

router.get('/notes', requireAuth, getAllNotes);

router.get('/notes/:id', requireAuth, getNoteById);

router.put('/notes/:id', requireAuth, updateNoteById);

router.delete('/notes/:id', requireAuth, deleteNoteById);

module.exports = router;
