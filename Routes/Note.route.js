const express = require('express');
const router = express.Router();
const { deleteNoteById } = require('../Controller/Notes.controller.js');

router.delete('/:id', deleteNoteById);

module.exports = router;