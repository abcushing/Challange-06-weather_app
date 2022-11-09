var APIKEY = 'addd896774748bd74c75435e0840431b';

// get locaion api
function getLatLon(search) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + search + '&appid=' + APIKEY)
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0])
            var location = {
                lat: data[0].lat,
                lon: data[0].lon
            }
            console.log(location);
            getWeather (data[0].lat, data[0].lon)
        })

}
// get weather api
function getWeather(lat, lon) {
    fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + APIKEY)
        .then((response) => response.json())
        .then((data) => {
            console.log('i got this')
            console.log(data);
        })

}

// // main process
// $(document).ready(function () {

getLatLon('denver');

// });