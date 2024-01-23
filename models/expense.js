const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ExpenseSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },

  amount: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  userid: {
    type: String,
    required: true,
  },
});

module.exports = model("Expenses", ExpenseSchema);
