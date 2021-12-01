
// imports
const mongoose = require( 'mongoose' );


// connection
const connection = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log( `Base de datos distribuida y lista para usarse` );
    } catch ( err ) {
        throw new Error( `Error con la conexion con la base de datos distribuida` );
    };

};


// exports
module.exports = connection;