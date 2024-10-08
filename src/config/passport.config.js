import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const inicialicePassport = () => {
    const cookieExtractor = (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies["dinoCookiesToken"];
        }
        return token;
    };

    passport.use("JWT", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "dinoSecretKey"
    }
    , async (jwtPayload, done) => {
        try {
            return done(null, jwtPayload);
        } catch (error) {
            return done(error);
        }
    }));
};

export default inicialicePassport