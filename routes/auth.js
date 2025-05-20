const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post("/register", async (req, res) => {
    try {
        await auth.registerUser(req.body);
        res.render("register", { errorMessage: "", successMessage: "User created", username: "" });
    }
    catch (err) {
        res.render("register", { errorMessage: err, successMessage: "", username: req.body.username });
    }
});

router.get("/register", (req, res) => {
    res.render("register", { errorMessage: "", successMessage: "", username: "" });
});

router.post("/login", async (req, res) => {
    try {
        req.body.userAgent = req.get('User-Agent');
        const user = await auth.checkUser(req.body);
        
        await auth.loginUser(req, res, user);
        res.redirect("/");
    }
    catch (err) {
        res.render("login", { errorMessage: err, username: req.body.username });
    }
})

router.get("/login", (req, res) => {
    res.render("login", { errorMessage: "", username: "" });
});

router.get("/logout", auth.logoutUser);

router.post("/token", auth.refreshAccessToken);

module.exports = router;
