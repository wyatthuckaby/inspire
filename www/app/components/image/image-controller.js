function ImageController() {

    var service = new ImageService();

    function drawImage(image) {
        console.log(image);
        $("#primaryContainer").css("background-image", `url(${image.response.image.url})`);
        $("#primaryContainer").css("-webkit-background-size", `cover`); //chrome/chromium
        $("#primaryContainer").css("-moz-background-size", `cover`); //FF and aoura
        $("#primaryContainer").css("-o-background-size", `cover`); //Opera
        $("#primaryContainer").css("background-size", `cover`); //Else
    }

    service.getImage(drawImage);

}