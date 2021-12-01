
// imports
const { request, response } = require( 'express' );
const { buscarLugar, climaLugar } = require('../helpers/searchs');
const User = require( '../models/User' );
const bcryptjs = require( 'bcryptjs' );
const passport = require( 'passport' );


// getHome
const getHome = ( req = request, res = response ) => {

    res.render( 'index', { title: 'Inicio' } );

};


// getSearch
const getSearch = ( req = request, res = response ) => {

    res.render( 'search', { title: 'Buscador' } );

};


// postResults
const postResults = async( req = request, res = response  ) => {

    const { city } = req.body;
    const resultado = await buscarLugar( city );

    // lats
    const lat1 = resultado[0].lat;
    const lat2 = resultado[1].lat;
    const lat3 = resultado[2].lat;
    const lat4 = resultado[3].lat;

    const lon1 = resultado[0].lon;
    const lon2 = resultado[1].lon;
    const lon3 = resultado[2].lon;
    const lon4 = resultado[3].lon;

    const clima1 = await climaLugar( lat1, lon1 );
    const clima2 = await climaLugar( lat2, lon2 );
    const clima3 = await climaLugar( lat3, lon3 );
    const clima4 = await climaLugar( lat4, lon4 );

    const cityes = [

        {
            name: resultado[0].nombre,
            lat: lat1,
            lon: lon1,
            description: clima1.description,
            temp: clima1.temp
        },

        {
            name: resultado[1].nombre,
            lat: lat2,
            lon: lon2,
            description: clima2.description,
            temp: clima2.temp
        },

        {
            name: resultado[2].nombre,
            lat: lat3,
            lon: lon3,
            description: clima3.description,
            temp: clima3.temp
        },

        {
            name: resultado[3].nombre,
            lat: lat4,
            lon: lon4,
            description: clima4.description,
            temp: clima4.temp
        },

    ]

    res.render( 'results', { title: 'Resultados', cityes } );

};


// getRegister
const getRegister = async( req = request, res = response  ) => {

    res.render( 'register', { title: 'Registrarse' } );

};


// postRegister
const postRegister = async( req = request, res = response  ) => {

    const { email, password, reppassword } = req.body;
    if ( password.length < 4 ) {
        req.flash( 'errors', 'Las contraseñas debes ser mayores a 4 carácteres' );
        res.redirect( '/register' );
        return;
    } else if ( password != reppassword ) {
        req.flash( 'errors', 'Las contraseñas no coinciden' );
        res.redirect( '/register' );
        return;
    } else {
        const userEmail = await User.findOne({ email });
        if ( !userEmail ) {
            const user = new User({ email, password });
            const salt = bcryptjs.genSaltSync( 10 );
            user.password = bcryptjs.hashSync( password, salt );
            await user.save();
            req.flash( 'succes', 'Te has registrado correctamente' );
            res.redirect( '/login' );
        } else {
            req.flash( 'errors', 'Oops, ese correo ya esta registrado !' );
            res.redirect( '/register' );
        };
    };

};


// getLogin
const getLogin = async( req = request, res = response  ) => {

    res.render( 'login', { title: 'Iniciar sesion' } );

};


// postLogin
const postLogin = passport.authenticate( 'local', {

    failureRedirect: '/login',
    successRedirect: '/search',
    failureFlash: true

});


// getLogout
const getLogout = async( req = request, res = response  ) => {

    req.logout();
    req.flash( 'succes', 'Cesion cerrada con exito' );
    res.redirect( '/login' )

};


// getOther
const getOther = async( req = request, res = response  ) => {

    res.redirect( '/home' );

};


// exports
module.exports = {
    getHome,
    getSearch,
    postResults,
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getLogout,
    getOther
};