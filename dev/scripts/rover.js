const rover = {};

rover.roverApiKey = 'lcjdv0yXDikxF5uomOk79VCAgZ1lt1XtEGLxIFmC'

//----------
//API Calls
//----------
rover.getNasa = () => {
    $.ajax({
        url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.roverChoice}/photos`,
        method: 'GET',
        dataType: 'json',
        data: {
            sol: '10',
            api_key: rover.roverApiKey,
            // page: '1',
            // camera: 'NAVCAM'
        }
    }).then((res) => {
        console.log(res);
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

//-------
// intro
//-------
rover.introSubmit = () => {
    const intro = $('.intro-container');
    const main = $('.main-container');
    main.hide();
    $('#chooseRover').on('change', function () {
        rover.roverChoice = $(this).val();   
    intro.hide();
    main.show();
    });
};


//---------------
//parallax effect
//---------------
rover.scroll = () => {
    $.jInvertScroll(['.sand', '#myCanvas']);
};


//random number generator 
rover.randomNum = (max) => Math.floor(Math.random() * max);

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
        const quoteContainer = $('.quote');
        quoteContainer.toggle('.hide');
    }, 10000);
};

//-------
// Nasa 
//-------
rover.imgContainer = $('.nasa-image');

rover.displayNasaImg = (roverImgs) => {
    let randomIndex = rover.randomNum(roverImgs.length);
    const imgChoice = roverImgs[randomIndex].img_src;
    rover.imgContainer.addClass('show');
    rover.imgContainer.removeClass('hide');
    console.log(imgChoice);
    rover.imgContainer.html(`<img src="${imgChoice}">
        <span class="close-button">&#x2715</span>`);
};

rover.eventRoverClick = () => {
    $('.rover-img').on('click', function () {
        rover.getNasa();
    });
};

rover.eventCloseClick = () => {
    const nasaImgContainer = $('.nasa-image');
    nasaImgContainer.on('click', '.close-button', function () {
        rover.imgContainer.addClass('hide')
        rover.imgContainer.removeClass('show');
    });
};

rover.init = () => {
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
};

$(rover.init());