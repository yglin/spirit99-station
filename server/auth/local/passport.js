import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

function localAuthenticate(User, email, password, done) {
    User.find({
        where: {
            email: email.toLowerCase()
        }
    })
    .then(user => {
        if (!user) {
            return done(null, false, {
                fields: { email: '這個信箱帳號尚未註冊' }
            });
        }

        user.authenticate(password, function(authError, authenticated) {
            if (authError) {
                return done(authError);
            }
            if (!authenticated) {
                return done(null, false, { fields: { password: '密碼錯誤'} });
            } else {
                return done(null, user);
            }
        });
    })
    .catch(err => done(err));
}

export function setup(User, config) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, function(email, password, done) {
        return localAuthenticate(User, email, password, done);
    }));
}
