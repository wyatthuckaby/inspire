function ImageService() {
    var route = "//bcw-getter.herokuapp.com/?url=";
    var api = "https://api.desktoppr.co/1/wallpapers/random";

    this.getImage = function(cb) {
        $.get(route + encodeURIComponent(api), (res) => {
            cb(JSON.parse(res));
        })
    }
}