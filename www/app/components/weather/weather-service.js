function WeatherService() {
    var url = '//bcw-getter.herokuapp.com/?url=';
    var url2 = 'http://api.openweathermap.org/data/2.5/weather?q=boise&&APPID=b4e418457d55e809573e4f84e1dea537'
    var apiUrl = url + encodeURIComponent(url2);

    this.getWeather = function(cb) {
        $.get(apiUrl, function(res) {
            res = JSON.parse(res)
            localStorage.setItem('weather', JSON.stringify(res))
                // HEY FUN FACT 
                // Have you ever wanted to know the temperature measured in kelvin?
                // You should probably convert the temperature data
            cb(res);
        })
    }
}