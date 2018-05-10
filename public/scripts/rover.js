'use strict';

var rover = {};

rover.roverApiKey = 'lcjdv0yXDikxF5uomOk79VCAgZ1lt1XtEGLxIFmC';

rover.getNasa = function () {
    return $.ajax({
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

//parallax effect
rover.scroll = function () {
    $.jInvertScroll(['.foreground', '.sand', '.sky', '.mountains1', '.mountains2', '.mountains3']);
};

rover.randomNum = function (max) {
    return Math.floor(Math.random() * max);
};

rover.displayQuote = function (quote) {
    var quoteText = quote.quoteText;
    var quoteAuthor = quote.quoteAuthor;
    console.log(quoteText, quoteAuthor);
    var quoteContainer = $('.quote');
    quoteContainer.append('<q>' + quoteText + '</q> \n                        <p>' + quoteAuthor + '</p>');
    //console.log(quoteText, quoteAuthor);
};

rover.displayNasaImg = function (roverImgs) {
    var randomIndex = rover.randomNum(roverImgs.length);
    var imgChoice = roverImgs[randomIndex].img_src;
    // imgChoice.css('height', '500px');
    console.log(imgChoice);
    var imageContainer = $('.nasa-image');
    imageContainer.append('<img src="' + imgChoice + '">)');
};

// rover.chooseAPI = (num) => {
//     if(num === 0){
//         console.log('quote');
//         rover.getQuote();
//         //call quote api 
//     //display bubble above the rover
//     //make quote last 5 seconds and then disappear
//     }else{
//         console.log('nasa');

//         //call nasa api
//     // display full image 
//     //include exit button to close image
//     }
// }


rover.eventRoverClick = function () {
    $('.rover-img').on('click', function () {
        rover.getNasa();
    });
};

rover.init = function () {
    //rover.parallax();
    rover.scroll();
    rover.eventRoverClick();
    //nasa called in init because it takes awhile to load and only needs to be called once
    //console.log(rover.getNasa());
    rover.getQuote();
};

$(rover.init());