const mongoose = require("mongoose");

const nomineeSchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }
});

const Nominee = mongoose.model("Nominee", nomineeSchema);
module.exports = Nominee;