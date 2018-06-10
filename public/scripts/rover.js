'use strict';

var rover = {};

rover.roverApiKey = 'lcjdv0yXDikxF5uomOk79VCAgZ1lt1XtEGLxIFmC';
rover.bgMusic = new Howl({
    src: ['space.mp3']
});

//----------
// API Calls
//----------
rover.getNasa = function () {
    $.ajax({
        url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover.roverChoice + '/photos',
        method: 'GET',
        dataType: 'json',
        data: {
            sol: rover.randomNum(1000),
            api_key: rover.roverApiKey,
            page: '1'
        }
    }).then(function (res) {
        if (res.length === 0) {
            rover.getNasa();
        } else {
            rover.displayNasaImg(res.photos);
        }
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
// Parallax effect
//---------------
rover.scroll = function () {
    $.jInvertScroll(['.sand', '.pink-container', '.green-container', '.red-container', '.yellow-container', '.milky-way-container', '.stars', '#myCanvas']);
};

//random number generator 
rover.randomNum = function (max) {
    return Math.floor(Math.random() * max);
};

//------
// Quote
//------
rover.displayQuote = function (quote) {
    var quoteText = quote.quoteText;
    var quoteAuthor = quote.quoteAuthor;
    var quoteContainer = $('.quote');
    quoteContainer.empty();
    quoteContainer.append('<q>' + quoteText + '</q> \n                        <p>' + quoteAuthor + '</p>');
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
rover.imgContainer = $('.nasa-image-container');
rover.directImgContainer = $('.nasa-image');

rover.displayNasaImg = function (roverImgs) {

    if (roverImgs.length === 0) {
        console.log('img undefined call nasa api again');
        rover.getNasa();
    } else {

        var randomIndex = rover.randomNum(roverImgs.length);
        var imgChoice = roverImgs[randomIndex].img_src;
        rover.imgContainer.addClass('show');
        rover.imgContainer.removeClass('hide');
        rover.directImgContainer.html('<img src="' + imgChoice + '">\n        <span class="close-button">&#x2715</span>');
        setTimeout(function () {
            rover.imgContainer.addClass('show');
            rover.imgContainer.removeClass('hide');
        }, 100);
    }
};

rover.eventRoverClick = function () {
    $('.rover-img').on('click', function () {
        $('.loading').fadeIn();
        rover.getNasa();
    });
};
/// event for closing the image from getNasa()
rover.eventCloseClick = function () {
    rover.imgContainer.on('click', '.close-button', function () {
        $('.loading').hide();
        rover.imgContainer.addClass('hide');
        rover.imgContainer.removeClass('show');
    });
};

//-------
// Intro
//-------

// anime.js
rover.charge = function () {
    var obj = { charged: '0%' };

    var JSobject = anime({
        targets: obj,
        charged: '100%',
        round: 1,
        easing: 'linear',
        update: function update() {
            var el = document.querySelector('#charge pre');
            el.innerHTML = JSON.stringify(obj);
        }
    });
};
// anime.js ends
rover.chooseRover = function () {
    var roverImg = $('.rover-img');
    if (rover.roverChoice === 'curiosity') {
        roverImg.attr('src', 'public/assets/rover.png');
    } else if (rover.roverChoice === 'opportunity') {
        roverImg.attr('src', 'public/assets/opportunity.svg');
    } else {
        roverImg.attr('src', 'public/assets/spirit.svg');
    };
};

rover.introSubmit = function () {
    var intro = $('.intro-container');
    var main = $('.main-container');
    $('#chooseRover').on('change', function () {
        rover.roverChoice = $(this).val();
        rover.chooseRover();
        rover.bgMusic.play();
        intro.hide();
        main.show();
    });
    main.hide();
};

rover.canvasResize = function () {
    window.addEventListener('resize', function () {
        var height = window.innerHeight;
        var width = window.innerWidth;

        var canvas = $('#myCanvas');
        canvas.css({
            'height': height,
            'width': width
        });
    });
};

rover.removeInstructions = function () {
    window.addEventListener('scroll', function () {
        setTimeout(function () {
            $('.instructionContainer').fadeOut();
        }, 1000);
    });
};

rover.init = function () {
    //focus on input on load
    var select = $('.rover-selection-container').focus();
    //charging rover
    rover.charge();
    // hiding the intro container
    rover.introSubmit();
    //start inverted parallax scroll
    rover.scroll();
    //start timer to display quote
    rover.quoteDisplayTimer();
    //click rover to get NASA imgs
    rover.eventRoverClick();
    //click to close NASA imgs
    rover.eventCloseClick();
    rover.canvasResize();
    rover.removeInstructions();
};

$(rover.init());