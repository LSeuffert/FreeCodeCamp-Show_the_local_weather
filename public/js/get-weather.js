var getWeather = function (pos) {
    'use strict';
    
    var lat = pos.coords.latitude,
        lon = pos.coords.longitude,
        mapsKey = "AIzaSyB__1P8dl2LFysV1bSqwBGsVD-DGRhLYhA",
        darkskyURL = `https://api.darksky.net/forecast/8b429e6babdca8b12a65d76f22c54abc/${lat},${lon}?exclude=[minutely,hourly,daily,alerts]`;
        
    
    // print the weather forecast
    $.ajax({
        "dataType": "jsonp",
        "url": darkskyURL,
        "crossDomain": true,
        "success": printWeather
    });
    
    // print the location
    var googleMapsURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=locality&key=${mapsKey}`;
    $.getJSON(googleMapsURL, printLocation);
};

var printLocation = function (json) {
    'use-strict';
    
    $(".location").html(json.results[0].formatted_address);
}

var printWeather = function (json) {
    'use-strict';
    
    var unit = json.flags.units === "us" ? "F" : "C";
    var info = {
        "temp": json.currently.temperature,
        "icon": json.currently.icon,
        "summary": json.currently.summary,
        "units": unit
    };

    $(".temperature").html(`${info.temp} °${info.units}`);
    $(".condition").html(info.summary);
    printIcon(info.icon);
};

var printIcon = function (iconTitle) {
    switch (iconTitle) {
        case "clear-day":
        case "clear-night":
        case "rain":
        case "snow":
        case "sleet":
        case "wind":
        case "fog":
        case "cloudy":
        case "partly-cloudy-day":
        case "partly-cloudy-night":
            $(".icons canvas").attr("id", iconTitle);
            break;
        default:
            
    }
    
    var icons = new Skycons(),
              list  = [
                "clear-day", "clear-night", "partly-cloudy-day",
                "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
                "fog"
              ],
              i;

    for(i = list.length; i--; )
        icons.set(list[i], list[i]);

    icons.play();
};

$(document).ready(function() {
    $.ajaxSetup({ cache: false });
    var geo = navigator.geolocation;
    
    if (geo) {
        geo.getCurrentPosition(getWeather);
    }
});