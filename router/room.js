const express = require("express");
const router = express.Router();

const { roomCreate } = require("../controllers/roomController")



router.route("/").get(roomCreate)




module.exports = router;