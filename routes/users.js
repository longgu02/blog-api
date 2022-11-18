const express = require("express");
const router = express.Router();
const { get, getDetail, register, edit } = require("../controllers/users");

router.get("/", get);
router.get("/:id", getDetail);
router.post("/register", register);
router.put("/:id/edit", edit);

module.exports = router;
