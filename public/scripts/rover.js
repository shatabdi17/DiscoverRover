'use strict';

var rover = {};

rover.roverApiKey = 'lcjdv0yXDikxF5uomOk79VCAgZ1lt1XtEGLxIFmC';

rover.getNasa = function () {
    $.ajax({
        url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?',
        method: 'GET',
        dataType: 'json',
        data: {
            sol: '1000',
            api_key: rover.roverApiKey
        }
    }).then(function (res) {
        console.log(res);
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
        console.log(res);
    });
};

rover.init = function () {
    rover.getNasa();
    rover.getQuote();
};

$(rover.init());