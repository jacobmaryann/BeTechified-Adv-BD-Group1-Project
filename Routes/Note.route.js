const express = require('express');
const router = express.Router();
const { deleteNote, createNote } = require('../Controller/Notes.controller.js');

router.post('/', createNote);
router.delete('/:id', deleteNote);

module.exports = router;