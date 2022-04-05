const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const init = (passport, getUserByEmail, getUserById) => {

  const authenticateUser = async (email, password, done) => {

    const user = getUserByEmail(email);
    if(!user) 
      return done(null, false, `user with email ${email}, not found`);

    try {
      if(await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, 'incorrect password');
      }
    } catch (err) {
      done(e);
    }
  }
  passport.use(new localStrategy({usernameField: 'email'}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = init;