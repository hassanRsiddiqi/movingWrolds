import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/Users";

function setPassortConfigs(passport) {
  let opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = 'A!@#$%^&*()qwertyuiopzxcvbnm,./}{:">?><';
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findOne({ id: jwt_payload.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
}

module.exports = setPassortConfigs;
