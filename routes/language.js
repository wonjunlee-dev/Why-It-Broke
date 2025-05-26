const express = require('express');
const router = express.Router();
const lang = require('../controllers/langController');

router.post("/languages", lang.addLanguage);

module.exports = router;
