const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    tags: {
        type: String,
        enum: ["work", "personal", "urgent", "others"],
        required: false
    }

} , { timestamps: true }
);

NoteSchema.index({ title: 'text', content: 'text', category: 'text', tags: 'text' });

const NotesModel = mongoose.model('Note', NoteSchema);

module.exports = NotesModel;