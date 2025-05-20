const express = require('express');
const router = express.Router();
const lang = require('../controllers/langController');

router.post("/addLanguage", lang.addLanguage);

module.exports = router;
