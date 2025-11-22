import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  uid: {
    type: Number,
    required: true,
    unique: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  content: {
    tyep: String,
    required: true,
    trim: true,
  },
}, {timestamps: true});

const Note = mongoose.model("Note", noteSchema);
export default Note;