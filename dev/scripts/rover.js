const rover = {};

rover.roverApiKey = 'lcjdv0yXDikxF5uomOk79VCAgZ1lt1XtEGLxIFmC'
rover.bgMusic = new Howl({
    src: ['space.mp3']
});

//----------
// API Calls
//----------
rover.getNasa = () => {
    $.ajax({
        url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.roverChoice}/photos`,
        method: 'GET',
        dataType: 'json',
        data: {
            sol: rover.randomNum(1000),
            api_key: rover.roverApiKey,
            page: '1'
        }
    }).then((res) => {
        if (res.length === 0) {
            rover.getNasa();
        } else {
            rover.displayNasaImg(res.photos);
    }
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
// Parallax effect
//---------------
rover.scroll = () => {
    $.jInvertScroll(['.sand', '.pink-container', '.green-container', '.red-container', '.yellow-container', '.milky-way-container', '.stars', '#myCanvas']);
};


//random number generator 
rover.randomNum = (max) => Math.floor(Math.random() * max);

//------
// Quote
//------
rover.displayQuote = (quote) => {
    const quoteText = quote.quoteText;
    const quoteAuthor = quote.quoteAuthor;
    const quoteContainer = $('.quote');
    quoteContainer.empty();
    quoteContainer.append(`<q>${quoteText}</q> 
                        <p>${quoteAuthor}</p>`);
};

rover.quoteDisplayTimer = () => {
    setInterval(function () {
        rover.getQuote();
        const quoteContainer = $('.quote');
        quoteContainer.toggle('.hide');
    }, 10000);
};

//-------
// Nasa 
//-------
rover.imgContainer = $('.nasa-image-container');
rover.directImgContainer = $('.nasa-image');

rover.displayNasaImg = (roverImgs) => {

    if (roverImgs.length === 0) {
        console.log('img undefined call nasa api again');
        rover.getNasa();
    } else {

    let randomIndex = rover.randomNum(roverImgs.length);   
    const imgChoice = roverImgs[randomIndex].img_src;
    rover.imgContainer.addClass('show');
    rover.imgContainer.removeClass('hide');
    rover.directImgContainer.html(`<img src="${imgChoice}">
        <span class="close-button">&#x2715</span>`);
        setTimeout(function () {
            rover.imgContainer.addClass('show');
            rover.imgContainer.removeClass('hide');
        }, 100);
    }
};

rover.eventRoverClick = () => {
    $('.rover-img').on('click', function () {
        $('.loading').fadeIn();
        rover.getNasa();
    });
};
/// event for closing the image from getNasa()
rover.eventCloseClick = () => {
    rover.imgContainer.on('click', '.close-button', function () {
        $('.loading').hide();
        rover.imgContainer.addClass('hide')
        rover.imgContainer.removeClass('show');
    });
};

//-------
// Intro
//-------

// anime.js
rover.charge = () => {
    const obj = { charged: '0%' };

    const JSobject = anime({
        targets: obj,
        charged: '100%',
        round: 1,
        easing: 'linear',
        update: function () {
            var el = document.querySelector('#charge pre');
            el.innerHTML = JSON.stringify(obj);
        }
    });
};
// anime.js ends
rover.chooseRover = () => {
    const roverImg = $('.rover-img');
    if (rover.roverChoice === 'curiosity') {
        roverImg.attr('src', 'public/assets/rover.png');
    } else if (rover.roverChoice === 'opportunity') {
        roverImg.attr('src', 'public/assets/opportunity.svg');
    } else {
        roverImg.attr('src', 'public/assets/spirit.svg');
    };
};

rover.introSubmit = () => {
    const intro = $('.intro-container');
    const main = $('.main-container');
    $('#chooseRover').on('change', function () {
        rover.roverChoice = $(this).val();
        rover.chooseRover();
        rover.bgMusic.play();
        intro.hide();
        main.show();
    });
    main.hide();
};

rover.canvasResize = () => {
    window.addEventListener('resize', function(){
        const height = window.innerHeight;
        const width = window.innerWidth;
        
        const canvas = $('#myCanvas');
        canvas.css({
            'height': height,
            'width': width
        });
    })
}

rover.removeInstructions = () => {
    window.addEventListener('scroll', function(){
        setTimeout(function () {
            $('.instructionContainer').fadeOut();
        }, 1000);
    });
}

rover.init = () => {
    //focus on input on load
    const select = $('.rover-selection-container').focus();
    //charging rover
    rover.charge();
    // hiding the intro container
    rover.introSubmit();
    //start inverted parallax scroll
    rover.scroll();
    //start timer to display quote
    rover.quoteDisplayTimer()
    //click rover to get NASA imgs
    rover.eventRoverClick();
    //click to close NASA imgs
    rover.eventCloseClick();
    rover.canvasResize();
    rover.removeInstructions();
};

$(rover.init());