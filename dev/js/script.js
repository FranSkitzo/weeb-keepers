//get information (or at least saved title) from localstorage "watchlist"

let titles = {};

function loadtitles() {
    titles = JSON.parse(localStorage.getItem("card-list"));

    //if nothing in localstorage, create a new objection to track status arrays
    if(!titles) {
        titles = {
            want: [],
            current: [],
            completed: [],
        }
    }

    console.log(titles);

    if(titles.want != null) {
        for(let i = 0; i < titles.want.length; i++) {
            console.log(titles.want[i].image + ' ' + titles.want[i].title);
            let dataTitle = titles.want[i].title;
                console.log(dataTitle)
            
            
                let dataImg = titles.want[i].image;
                console.log(dataImg);
                let card = document.createElement('div');
                let cardTitle = document.createElement('p');
                let cardImg = document.createElement('img');

                $(card).addClass('anime-card');
                //$(card).css('background-image', dataImg);
                $(cardImg).attr('src', dataImg)
                $(cardTitle).text(dataTitle);
                $(card).append(cardImg);
                $(card).append(cardTitle);

                          
                //add title to watchlist
                $("#row-want").append(card);
                dragdrop();
        }
    }
    
    if(titles.current != null) {
        for(let i = 0; i < titles.current.length; i++) {
            console.log(titles.current[i].image + ' ' + titles.current[i].title);
            let dataTitle = titles.current[i].title;
                console.log(dataTitle)
            
            
                let dataImg = titles.current[i].image;
                console.log(dataImg);

                let card = document.createElement('div');
                let cardTitle = document.createElement('p');

                let cardImg = document.createElement('img');

                $(card).addClass('anime-card');
                //$(card).css('background-image', dataImg);
                $(cardImg).attr('src', dataImg)
                $(cardTitle).text(dataTitle);
                $(card).append(cardImg);
                $(card).append(cardTitle);
                
                //add title to watchlist
                $("#row-current").append(card);
                dragdrop();
        }
    }
    
    if(titles.completed != null) {
        for(let i = 0; i < titles.completed.length; i++) {
            console.log(titles.completed[i].image + ' ' + titles.completed[i].title);
            let dataTitle = titles.completed[i].title;
            console.log(dataTitle);
            
            
            let dataImg = titles.completed[i].image;
            console.log(dataImg);

            let card = document.createElement('div');
            let cardTitle = document.createElement('p');
            let cardImg = document.createElement('img');

            $(card).addClass('anime-card');
            //$(card).css('background-image', dataImg);
            $(cardImg).attr('src', dataImg)
            $(cardTitle).text(dataTitle);
            $(card).append(cardImg);
            $(card).append(cardTitle);
                
                //add title to watchlist
            $("#row-completed").append(card);
            dragdrop();
    
        }
    }

}

function savetitles() {
    localStorage.setItem("card-list",JSON.stringify(titles));
}

$("#resetbtn").click(function(){
    localStorage.clear();
    location.reload();
})

//add capability to drag and drop
function dragdrop() {
    $(".card").sortable({
        connectWith: $(".card"),
        scroll: false,
        tolerance: "pointer",

        update: function() {
            console.log($(this));
            let temparray = [];

            $(this).children().each(function (){
                //saves title to temp array
                temparray.push({
                    title: $(this)
                    .find("p")
                    .text(),
                    image: $(this).find('img').attr('src')                   
                });
                
            });

            let status = $(this).attr("id").replace("row-", "");
                titles[status]=temparray;
                savetitles();
                console.log(titles);
                //watchlist = titles;
        }
    })
}

let animechanurl = "https://animechan.vercel.app/api/random";
function getAnimeQuote() {
    $.get(animechanurl, function(quotedata) {
        console.log(quotedata)

        let quotetext = quotedata.quote;
        console.log(quotetext);

        let quoteanime = quotedata.anime;
        console.log(quoteanime)

        let quotecharacter = quotedata.character;
        console.log(quotecharacter)

        $("#quote").append('"'+quotetext+'"');
        $("#quote-character").append("<span>"+quotecharacter+"</span");
        $("#quote-anime").append("from "+quoteanime);
    })
}

$("#quotebtn").click(function(){
    location.reload();
})

getAnimeQuote();
loadtitles();