const apiKey = "c2d4a710d596f8467db6665a642f1a64";
/**
 * 
 * geocoding part
 */
var geocoding_Url ="http://api.openweathermap.org/geo/1.0/direct?";
var city_tag ="q=",limit ="&limit="+"1";
// global var
var appid ="&appid="+apiKey;
var  lat_response,lon_response ;
/**
 * open weather app part
 */
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
var openWeather_api_url ="https://api.openweathermap.org/data/2.5/weather?";
var lat_tag = "lat=";
var lon_tag ="&lon=";
var unit_temp ="&units=metric";
async function fetch_weather_data(){
    /**
     * make the api request to fetch the lat and longitude of the city required
     */
    let cityName = document.getElementById("search_input").value ;
    let fullApiUrl_geocoding = `${geocoding_Url}${city_tag}${cityName}${limit}${appid}`;
    const geo_response = await fetch(fullApiUrl_geocoding);
    var geo_data = await geo_response.json();

    lat_response=geo_data[0].lat;
    lon_response=geo_data[0].lon;
    
    console.log(lon_response, lat_response);
    /**
     * fetch the weather data
     */
    let fullApiUrl_openWeatherApp =`${openWeather_api_url}${lat_tag}${lat_response}${lon_tag}${lon_response}${unit_temp}${appid}`;
    const openWeather_response = await fetch(fullApiUrl_openWeatherApp);
    var openweatherApp_data = await openWeather_response.json();
    console.log(openweatherApp_data);
    /**
     * update the page data:
     */
    document.querySelector(".city").innerHTML = openweatherApp_data.name;
    document.querySelector(".temperature").innerHTML=Math.round(openweatherApp_data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = openweatherApp_data.main.humidity +"%";
    document.querySelector(".wind").innerHTML= openweatherApp_data.wind.speed +"Km/h";

    /**
     * update the images 
     */
    icon_name = openweatherApp_data.weather[0].icon;
    icon_name = icon_name.replace("n","d");
    let icon = document.querySelector(".weather_icon");
    icon.src = `resources/images/${icon_name}.png`;

}
