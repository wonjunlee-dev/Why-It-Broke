const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const User = require('../models/User');
const passport = require('passport');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        req => {
            const token = req?.cookies?.accessToken;
            return token;
        }
    ]),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(
    new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
        try {
            const user = await User.findById(jwt_payload.sub);
            if (user) {
                return next(null, user);
            }
            else {
                return next(null, false);
            }
        }
        catch (err) {
            return next(err, false);
        }
    })
);

module.exports = passport;
