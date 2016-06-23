import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

export function setup(User, config) {
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: [
            'displayName',
            'emails',
            'link'
        ]
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
                    provider: 'facebook'
                }
            ]
        }})
        .then(user => {
            if (user) {
                return user.update({
                    name: profile.displayName,
                    provider: 'facebook',
                    provider_id: profile.id,
                    facebook: profile._json
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
                    provider: 'facebook',
                    provider_id: profile.id,
                    facebook: profile._json
                });
                return user.save()
                .then(user => done(null, user));
            }
        })
        .catch(err => done(err));
    }));
}
