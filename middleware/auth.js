const passport = require('../config/passport');

const passportAuth = (options = { redirect: false }) => (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            if (options.redirect) {
                return res.redirect("/auth/login");
            }
            else {
                return res.status(401).json( { message: "Unauthorized " });
            }
        }
        req.user = user;
        next();
    })(req, res, next);
};

const optionalJwtAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        res.locals.user = user || null;
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
};

module.exports = { passportAuth, optionalJwtAuth };
