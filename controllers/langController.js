const Language = require('../models/Language');

async function addLanguage(req, res) {
    try {
        const { name } = req.body;
        await Language.create({ name });

        return res.status(201).json({ message: "Language successfully created" });
    }
    catch (err) {
        return res.status(500).json({ message: "Failed to create language" });
    }
}

module.exports = { addLanguage };
