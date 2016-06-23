import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

export function setup(User, config) {
    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        var email = profile.emails[0].value.toLowerCase();

        User.find({where:{
            $or: [
                {
                    email: email
                },
                {
                    provider_id: profile.id,
                    provider: 'google'
                }
            ]
        }})
        .then(user => {
            if (user) {
                return user.update({
                    name: profile.displayName,
                    provider: 'google',
                    provider_id: profile.id,
                    google: profile._json
                })
                .then(function (user) {
                    return done(null, user);                
                });
            }
            else {
                user = User.build({
                    name: profile.displayName,
                    email: email,
                    role: 'user',
                    provider: 'google',
                    provider_id: profile.id,
                    google: profile._json
                });
                return user.save()
                .then(user => done(null, user))
            }
        })
        .catch(err => done(err));
    }));
}
