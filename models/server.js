
// imports
const express = require( 'express' );
const cors = require( 'cors' );
const connection = require( '../database/config' );
const exphbs = require( 'express-handlebars' );
const path = require( 'path' );
const session = require( 'express-session' );
const flash = require( 'connect-flash' );
const passport = require( 'passport' );
require( '../config/passport' );


// Server
class Server {


    // constructor
    constructor() {

        this.app = express();
        this.puerto = process.env.PORT;
        this.dbConnection();
        this.settings();
        this.middlewares();
        this.routes();

    };


    // dbConnection
    async dbConnection() {

        await connection();

    };


    // settings
    settings() {

        this.app.set( 'views', 'views' );
        this.app.engine( 'hbs', exphbs({
            layoutsDir: path.join( 'views', 'layouts' ),
            partialsDir: path.join( 'views', 'partials' ),
            extname: '.hbs',
            defaultLayout: 'main'
        }) );
        this.app.set( 'view engine', '.hbs' );

    };


    // middlewares
    middlewares() {

        this.app.use( express.static( 'public' ) );
        this.app.use( cors() );
        this.app.use( express.urlencoded({ extended: true }) );
        this.app.use( session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }));
        this.app.use( passport.initialize() );
        this.app.use( passport.session() );
        this.app.use( flash() );
        this.app.use( ( req, res, next ) => {
            res.locals.succes = req.flash( 'succes' );
            res.locals.errors = req.flash( 'errors' );
            res.locals.error = req.flash( 'error' );
            res.locals.user = req.user || null;
            next();
        });

    };


    // routes
    routes() {

        this.app.use( require( '../routes/router' ) );

    };


    // listen
    listen() {

        this.app.listen( this.puerto, () => {
            console.log( `Escuchando en el puerto ${ this.puerto }` );
        });

    };


};


// exports
module.exports = Server;
