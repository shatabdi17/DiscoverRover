const rover = {};

rover.roverApiKey = 'lcjdv0yXDikxF5uomOk79VCAgZ1lt1XtEGLxIFmC'

//----------
//API Calls
//----------
rover.getNasa = () => {
    $.ajax({
        url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`,
        method: 'GET',
        dataType: 'json',
        data: {
            sol: '1000',
            api_key: rover.roverApiKey,
            page: '1',
            camera: 'NAVCAM'
        }
    }).then((res) => {
        rover.displayNasaImg(res.photos);
    });
};

rover.getQuote = () => {
    $.ajax({
        url: `https://api.forismatic.com/api/1.0/`,
        method: 'getQuote',
        jsonp: "jsonp",
        dataType: "jsonp",
        data: {
            method: "getQuote",
            lang: "en",
            format: "jsonp"
        },
    }).then((res) => {
        rover.displayQuote(res);
    });
};
//---------------
//parallax effect
//---------------
rover.scroll = () => {
    $.jInvertScroll(['.foreground', '.sand', '.sky', '.mountains1', '.mountains2', '.mountains3', '#myCanvas']);
};



//random number generator 
rover.randomNum = (max) => Math.floor(Math.random()*max);

//------
//Quote
//------
rover.displayQuote = (quote) => {
    const quoteText = quote.quoteText;
    const quoteAuthor = quote.quoteAuthor;
    const quoteContainer = $('.quote');
    quoteContainer.empty();
    quoteContainer.append(`<q>${quoteText}</q> 
                        <p>${quoteAuthor}</p>`);
    //console.log(quoteText, quoteAuthor);
};

rover.quoteDisplayTimer = () => {
    setInterval(function () { 
        rover.getQuote();
    }, 10000);
};

//HELP CUE!!!!!!!!
//NEED PROMISE
rover.toggleQuoteDisplayTimer = () => {
    setInterval(function(){
        const quoteContainer = $('.quote');
        quoteContainer.toggle('.hide');
    }, 10000);
}

// $.when(jokeOne, jokeTwo)
//     .then((resOne, resTwo) => {
//         //returns array
//         console.log(resOne, resTwo)
//         console.log(resOne[0], resTwo[0])
//     })
//     .fail((err) => {
//         console.log(err);
//     });

//-------
// Nasa 
//-------
rover.displayNasaImg = (roverImgs) => {
    let randomIndex = rover.randomNum(roverImgs.length);
    const imgChoice = roverImgs[randomIndex].img_src;
    // imgChoice.css('height', '500px');
    console.log(imgChoice);
    const imageContainer = $('.nasa-image');
    imageContainer.append(`<img src="${imgChoice}">)`);
}


rover.eventRoverClick = () => {
    $('.rover-img').on('click', function(){
        rover.getNasa();
    });
};

rover.init = () => {
    //start inverted parallax scroll
    rover.scroll();
    //start timer to display quote
    rover.quoteDisplayTimer()
    rover.toggleQuoteDisplayTimer();
    //click rover to get NASA imgs
    rover.eventRoverClick();
};


$(rover.init());