
'use strict'

// variables principales
let dayNight = document.querySelector( '.dayNight' );
let menuToggle = document.querySelector( '.menuToggle' );
let body = document.querySelector( 'body' );
let navigation = document.querySelector( '.navigation' )


// dayNightFuncion
const dayNightFuncion = () => {
    body.classList.toggle( 'dark' );
    dayNight.classList.toggle( 'active' );
};


// menuToggleFuncion
const menuToggleFuncion = () => {
    menuToggle.classList.toggle( 'active' );
    navigation.classList.toggle( 'active' );
}


// toggle uso
dayNight.addEventListener( 'click', dayNightFuncion  );
menuToggle.addEventListener( 'click', menuToggleFuncion );