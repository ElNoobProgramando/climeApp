
// imports
const { Router } = require( 'express' );
const { getHome, getSearch, postResults, getRegister, postRegister, getLogin, postLogin, getLogout, getOther } = require( '../controllers/controller' );
const auth = require( '../helpers/auth' );


// router
const router = Router();


// get /home
router.get( '/home', getHome );


// get /search
router.get( '/search', auth, getSearch );


// post /results
router.post( '/results', auth, postResults );


// get /register
router.get( '/register', getRegister );


// post /register
router.post( '/register', postRegister );


// get /login
router.get( '/login', getLogin );


// post /login
router.post( '/login', postLogin );


// getLogout
router.get( '/logout', getLogout )


// get /*
router.get( '/*', getOther );


// exports
module.exports = router;