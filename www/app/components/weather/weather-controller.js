function WeatherController() {
    // var wc = this;
    var weatherService = new WeatherService();
    var tempType = "C";

    function convertToC(temp) {
        return temp - 273.15;
    }

    function convertToF(temp) {
        return ((temp * 9) / 5) - 459.67;
    }

    function drawWeather(currentWeather) {

        var temp = currentWeather.main.temp;
        if (tempType === "C") {
            temp = convertToC(temp);
        } else if (tempType === "F") {
            temp = convertToF(temp);
        }
        var weatherTemplate = `
        <h2 class="text-center currenttemp"> ${temp.toFixed(1)} &deg${tempType} </h2>
        <h2 class="text-center location"> ${currentWeather.name} </h2> 
        `;

        console.log(currentWeather);

        document.getElementById("weather").innerHTML = weatherTemplate;
    }



    weatherService.getWeather(drawWeather);
}