const express = require("express");
const router = express.Router();

const {
  getExpenses,
  createExpense,
  deleteExpense,
} = require("../controller/v1controller");

router.route("/").get(getExpenses).post(createExpense);
router.route("/:id").delete(deleteExpense);

module.exports = router;
