
// improts
const { request, response } = require( 'express' );


// auth
const auth = ( req = request, res = response, next ) => {

    if ( req.isAuthenticated() ) {
        return next();
    };
    req.flash( 'errors', 'Iniciemos sesion primero antes de realizar esta accion' );
    res.redirect( '/login' );

};


// exports
module.exports = auth;