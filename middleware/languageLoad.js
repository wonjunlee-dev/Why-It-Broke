const Language = require("../models/Language");

module.exports = async (req, res, next) => {
    try {
        const languages = await Language.find({}, '_id name');

        res.locals.languages = languages;
        next();
    }
    catch (err) {
        res.locals.languages = [];
        next();
    }
};
