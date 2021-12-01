
// imports
const axios = require( 'axios' );


// buscarLugar
const buscarLugar = async( busqueda ) => {

    const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ busqueda }.json`,
        params: {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es'
        }
    });
    const peticion = await instance.get();
    return peticion.data.features.map( lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lat: lugar.center[ 1 ],
        lon: lugar.center[ 0 ]
    }));

};


// climaLugar
const climaLugar = async( lat, lon ) => {

    const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
            lat,
            lon,
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    });
    const peticion = await instance.get();
    const { weather, main } = peticion.data
    return {
        description: weather[ 0 ].description,
        temp: main.temp,
    };

};


// exports
module.exports = {
    buscarLugar,
    climaLugar
};