const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt =require('passport-jwt').ExtractJwt;
const Customer=require('../Models/Customer');

module.exports =function(passport){
    let opts = {};
    const secret = 'dshfgksjfhkldsdkjasbsjh87wndbasnhe7'
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    
        Customer.findById(jwt_payload.data._id,(err, customer) => {
            if(err){
                return done(err, false);
            }
            if(customer){
                return done(null, customer);
            } else {
                return done(null, false);
            }
        });
    }));
}