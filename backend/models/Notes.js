const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    //// mongoose.Schema.Types.ObjectId is a type in the Mongoose library which represents a MongoDB ObjectId. It is used as the primary key for Mongoose models by default. MongoDB ObjectId is a unique identifier for a document in a MongoDB collection.
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const NotesCollection = mongoose.model("notes", NotesSchema);
module.exports = NotesCollection;
