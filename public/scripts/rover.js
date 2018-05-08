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
//parallax effect for scroll
//forground moves faster than background

rover.randomNum = function () {
    return Math.floor(Math.random() * 2);
};

console.log(rover.randomNum());

rover.chooseAPI = function (num) {
    if (num === 0) {
        console.log('quote');
        rover.getQuote();
        //call quote api 
        //display bubble above the rover
        //make quote last 5 seconds and then disappear
    } else {
        console.log('nasa');

        //call nasa api
        // display full image 
        //include exit button to close image
    }
};

rover.eventRoverClick = function () {
    $('.rover-img').on('click', function () {
        rover.chooseAPI(rover.randomNum());
    });
};

rover.init = function () {
    rover.eventRoverClick();
    //nasa called in init because it takes awhile to load and only needs to be called once
    rover.getNasa();
};

$(rover.init());