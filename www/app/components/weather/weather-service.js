function WeatherService() {
    var url = '//bcw-getter.herokuapp.com/?url=';
    var url2 = 'http://api.openweathermap.org/data/2.5/weather?q=boise&&APPID=b4e418457d55e809573e4f84e1dea537'
    var apiUrl = url + encodeURIComponent(url2);

    this.getWeather = function(cb) {
        var currentTime = new Date();
        var storedWeather = JSON.parse(localStorage.getItem('weather'));
        if (storedWeather) {
            console.log("local storage exists");
            if (storedWeather.time > currentTime.getTime() - 1.8e5) {
                console.log("found new version in local storage")
                cb(storedWeather.wea);
                //prevent this from ever getting to the getter
                return;
            }
            //time for an update.
        }
        $.get(apiUrl, function(res) {
            res = JSON.parse(res)

            //when putting this in local storage we will want to make
            //sure it will update again *at some point* im guesstimating
            //about every 30 min to update. but within that time frame,
            //we dont want to overuse our calls to OWM
            //so we are gonna tie the current time to the weather object
            //that way we know when to update.
            var current = {
                time: currentTime.getTime(),
                wea: res
            };

            localStorage.setItem('weather', JSON.stringify(current))
            cb(res);
        })
    }
}