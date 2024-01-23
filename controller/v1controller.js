const Expenses = require("../models/expense");

const getExpenses = async (req, res) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    const data = await Expenses.find({ userid: token });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

const createExpense = async (req, res) => {
  try {
    const token = req.headers.authorization;
    req.body.userid = token;
    const expense = await Expenses.create(req.body);
    res.status(200).json(expense);
  } catch (error) {
    console.log(error);
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expenses.findByIdAndDelete(req.params.id);
    res.status(200).json(expense);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getExpenses, createExpense, deleteExpense };
