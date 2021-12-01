
// imports
const { Schema, model } = require( 'mongoose' );


// SchemaUser
const SchemaUser = new Schema({

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

});


// exports
module.exports = model( 'user', SchemaUser );