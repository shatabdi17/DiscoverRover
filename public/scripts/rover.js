'use strict';

var rover = {};

rover.roverApiKey = 'lcjdv0yXDikxF5uomOk79VCAgZ1lt1XtEGLxIFmC';

//----------
//API Calls
//----------
rover.getNasa = function () {
    $.ajax({
        url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos',
        method: 'GET',
        dataType: 'json',
        data: {
            sol: '1000',
            api_key: rover.roverApiKey,
            page: '1',
            camera: 'NAVCAM'
        }
    }).then(function (res) {
        rover.displayNasaImg(res.photos);
    });
};

rover.getQuote = function () {
    $.ajax({
        url: 'https://api.forismatic.com/api/1.0/',
        method: 'getQuote',
        jsonp: "jsonp",
        dataType: "jsonp",
        data: {
            method: "getQuote",
            lang: "en",
            format: "jsonp"
        }
    }).then(function (res) {
        rover.displayQuote(res);
    });
};
//---------------
//parallax effect
//---------------
rover.scroll = function () {
    $.jInvertScroll(['.foreground', '.sand', '.sky', '.mountains1', '.mountains2', '.mountains3', '#myCanvas']);
};

//random number generator 
rover.randomNum = function (max) {
    return Math.floor(Math.random() * max);
};

//------
//Quote
//------
rover.displayQuote = function (quote) {
    var quoteText = quote.quoteText;
    var quoteAuthor = quote.quoteAuthor;
    var quoteContainer = $('.quote');
    quoteContainer.empty();
    quoteContainer.append('<q>' + quoteText + '</q> \n                        <p>' + quoteAuthor + '</p>');
    //console.log(quoteText, quoteAuthor);
};

rover.quoteDisplayTimer = function () {
    setInterval(function () {
        rover.getQuote();
        var quoteContainer = $('.quote');
        quoteContainer.toggle('.hide');
    }, 10000);
};

//-------
// Nasa 
//-------
rover.displayNasaImg = function (roverImgs) {
    var randomIndex = rover.randomNum(roverImgs.length);
    var imgChoice = roverImgs[randomIndex].img_src;
    // imgChoice.css('height', '500px');
    console.log(imgChoice);
    var imageContainer = $('.nasa-image');
    imageContainer.append('<img src="' + imgChoice + '">');
    imageContainer.append('<span class="close-button">&#x2715</span>');
};

rover.eventRoverClick = function () {
    $('.rover-img').on('click', function () {
        rover.getNasa();
    });
};

rover.eventCloseClick = function () {
    var nasaImgContainer = $('.nasa-image');
    nasaImgContainer.on('click', '.close-button', function () {
        nasaImgContainer.empty();
    });
};

rover.init = function () {
    //start inverted parallax scroll
    rover.scroll();
    //start timer to display quote
    rover.quoteDisplayTimer();
    //click rover to get NASA imgs
    rover.eventRoverClick();
    //click to close NASA imgs
    rover.eventCloseClick();
};

$(rover.init());