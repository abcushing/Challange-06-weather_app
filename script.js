const APIKEY = 'addd896774748bd74c75435e0840431b';
const TODAY = new Date().toLocaleDateString();
var cityArray = [];

// get locaion from Location API
function getLatLon(search) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + search + '&appid=' + APIKEY)
        .then((response) => response.json())
        .then((data) => {
            console.log(TODAY)
            console.log(data[0])
            // capitalize the city if not capitalized in search
            var city = search.toLowerCase();
            var cityName = city.replace(city[0], city[0].toUpperCase());
            $('#currentCity').html(cityName);
            $('#currentDate').html(TODAY);
            console.log('cityArray' + cityArray + 'includes');
            if (cityArray.includes(cityName)) {
                console.log('message')
            } else {

                cityArray.push(cityName);
                console.log('something else' + cityArray);

            }
            // add to local storage
            localStorage.setItem('city', JSON.stringify(cityArray));
            var location = {
                lat: data[0].lat,
                lon: data[0].lon
            }
            console.log(location);
            getWeather(data[0].lat, data[0].lon,);
        })

}
// get weather from Weather API
function getWeather(lat, lon) {
    fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + APIKEY)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.daily[0]);
            // temp is in Kelvin, needs to be converted to Ferinheight
            let tempF = ((data.current.temp - 273.15) * 1.8) + 32;
            let formatTemp = Math.round(tempF * 100) / 100;
            // current temp (todays weather)
            $('#currentTemp').append(formatTemp);
            $('#currentWind').append(data.current.wind_speed);
            $('#currentHumidity').append(data.current.humidity);
            // 6 day forcast, looks better than the 5 day version
            console.log(data + "daily temps");
            for (i = 0; i < 6; i++) {
             
                let dailyTempF = ((data.daily[i].temp.max - 273.15) * 1.8) + 32;
                let formatDailyTemp = Math.round(dailyTempF * 100) / 100;
                let forcast = new Date(data.daily[i].dt).toLocaleDateString();
                $('#' + i + 'Temp').append(formatDailyTemp);
                $('#' + i + 'Wind').append(data.daily[i].wind_speed);
                $('#' + i + 'Humidity').append(data.daily[i].humidity);
                $('#' + i + 'Date').append(forcast);
            }
        })

}

// get cities from local storage
function retrieveLocalStorage() {
    var myCitys = localStorage.getItem('city');
    let cityArray = myCitys.split(',');
    console.log('myCitys' + typeof (cityArray));
    for (i = 0; i < cityArray.length; i++) {
        console.log(cityArray[i]);
        var cityButton = '<button id="' + cityArray[i] + '" type="button" class="btn btn-secondary">' + cityArray[i] + '</button></br></br>'
        $('#cityButtons').append(cityButton);
    }
}

// // main process

$(document).ready(function () {
    // window.onload = function () {
        retrieveLocalStorage();
        console.log(cityArray + "onload");
    // }

    // retrieveLocalStorage();
    for (i = 0; i < cityArray.length; i++) {
    $("#" + cityArray[i]).onclick = function () {
        city = cityArray[i];
        console.log(city);
        getLatLon(city);
    }
    }
    console.log($(citySearch));
    var city;
    submitCity.onclick = function () {
        city = $('#citySearch').val();
        console.log(city);
        getLatLon(city);
    }


});