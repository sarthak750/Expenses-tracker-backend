const { getData } = require("../controller/v1controller");

var express = require("express"),
  router = express.Router();
router.get("/", getData);

module.exports = router;
