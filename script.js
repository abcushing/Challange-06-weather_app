const APIKEY = 'addd896774748bd74c75435e0840431b';
const TODAY = new Date().toLocaleDateString();


// get locaion api
function getLatLon(search) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + search + '&appid=' + APIKEY)
        .then((response) => response.json())
        .then((data) => {
            console.log(TODAY)
            console.log(data[0])
            var city = search.toLowerCase();
            var cityName = city.replace(city[0], city[0].toUpperCase());
            $('#currentCity').html(cityName);
            $('#currentDate').html(TODAY);
            localStorage.setItem('city', cityName);
            var location = {
                lat: data[0].lat,
                lon: data[0].lon
            }
            console.log(location);
            getWeather(data[0].lat, data[0].lon,);
        })

}
// get weather api
function getWeather(lat, lon) {
    fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + APIKEY)
        .then((response) => response.json())
        .then((data) => {
            console.log('i got this');
            console.log(data.daily[0]);
            let tempF = ((data.current.temp - 273.15) * 1.8) + 32;
            let formatTemp = Math.round(tempF * 100) / 100;
            $('#currentTemp').append(formatTemp);
            $('#currentWind').append(data.current.wind_speed);
            $('#currentHumidity').append(data.current.humidity);
            for (i = 0; i < 6; i++) {
                console.log(data.daily[i].temp);
                let dailyTempF = ((data.daily[i].temp.max - 273.15) * 1.8) + 32;
                let formatDailyTemp = Math.round(dailyTempF * 100) / 100;
                $('#' + i + 'Temp').append(formatDailyTemp);
                $('#' + i + 'Wind').append(data.daily[i].wind_speed);
                $('#' + i + 'Humidity').append(data.daily[i].humidity);
            }
        })

}



function retrieveLocalStorage() {

}

// // main process
$(document).ready(function () {
    console.log($(citySearch));
    var city;
    submitCity.onclick = function () {
        city = $('#citySearch').val();
        console.log(city);
        getLatLon(city);
    }


});