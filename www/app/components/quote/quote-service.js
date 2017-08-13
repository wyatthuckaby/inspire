function QuoteService() {


    var route = "//bcw-getter.herokuapp.com/?url="
        //API 
    var url = "http://quotesondesign.com/api/3.0/api-3.0.json";
    //Parameters

    this.getQuote = function(cb) {
        /**
         * the API i wanted to use here had no limitations, but with some experiemtation i found
         * their JSON get requests to return inconstistantly. Thankfully, the quote and author appear
         * to be consitant in my minor testing of them. so im going to implement them with some fallback error checking.
         */


        $.get(route + encodeURIComponent(url), (res) => {
            console.log(res);
            res = res.replace("\'", " ");
            cb(JSON.parse(res));
        });
    }
}