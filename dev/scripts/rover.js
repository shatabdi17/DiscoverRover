const rover = {};

rover.roverApiKey = 'lcjdv0yXDikxF5uomOk79VCAgZ1lt1XtEGLxIFmC'

rover.getNasa = () => {
    return $.ajax({
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
        console.log(res.photos);
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
        console.log(res);
    });
};


//parallax effect
rover.scroll = () => {
    $.jInvertScroll(['.foreground', '.sand', '.sky', '.mountains1', '.mountains2', '.mountains3']);
};

// QUOTE FOR BUBBLE STARTS


// function createTooltip(event) {
//     $('<div class="tooltip"></div>').appendTo('body');
//     positionTooltip(event);
// };

// timeoutID = setTimeout(hideBubble, 150);

// function hideBubble() {
//     clearTimeout(timeoutID);
//     //--if the mouse isn't on the div then hide the bubble
//     if (bubbleExists && !onDiv) {
//         $(".rover").remove();
//         bubbleExists = false;
//     }
// }

// // QUOTE FOR BUBBLE ENDS

rover.randomNum = (max) => Math.floor(Math.random()*max);
    

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


rover.eventRoverClick = () => {
    $('.rover-img').on('click', function(){
        rover.chooseAPI(rover.randomNum(2));
        rover.showBubble();
    });
};

rover.init = () => {
    //rover.parallax();
    rover.scroll();
    rover.eventRoverClick();
    //nasa called in init because it takes awhile to load and only needs to be called once
    //console.log(rover.getNasa());
};


$(rover.init());