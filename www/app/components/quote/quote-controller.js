function QuoteController() {
    var service = new QuoteService();


    function drawQuote(quote) {
        console.log(quote);
        var template = `
            <h2 class="text-center quotetext"> ${quote.quote} </h2>
            <h3 class="text-center quoteauthor"> ~ ${quote.author}</h3>
        `;
        document.getElementById("quote").innerHTML = template;
    }

    service.getQuote(drawQuote);
}