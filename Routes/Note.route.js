const express = require('express');
const router = express.Router();
const { deleteNote, createNote, getNotes } = require('../Controller/Notes.controller.js');

router.post('/', createNote);
router.get('/', getNotes);
router.delete('/:id', deleteNote);

module.exports = router;