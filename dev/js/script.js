//get information (or at least saved title) from localstorage "watchlist"

let titles = {};

//get title and cover art from api
let saikiurl = "https://api.jikan.moe/v3/anime/33255";
$.get(saikiurl, function(saikidata) {
    let saikititle = saikidata.title;
    console.log(saikititle)

    let saikiid = saikidata.mal_id;
    console.log(saikiid);


    let saikiimgurl = saikidata.image_url;
    console.log(saikiimgurl);
    
    //add title to watchlist
    $("#want-row").append("<div id='title' class='want-to-watch column has-text-centered'><figure class='image is-inline-block'><img src='"+saikiimgurl+"'</figure><p class='is-size-7' id='anime-title'>"+saikititle+"</p></div>");
    dragdrop();
})

function loadtitles() {
    titles = JSON.parse(localStorage.getItem("card-list"));

    //if nothing in localstorage, create a new objection to track status arrays
    if(!titles) {
        titles = {
            wanttowatch: [],
            currentlywatching: [],
            completed: [],
        }
    }

    console.log(titles);

    for(let i = 0; i < titles.length; i++) {
        console.log(titles[i].image + ' ' + titles[i].title);
        $.get(titles[i], function(data) {
            let dataTitle = data.title;
            console.log(dataTitle)
        
        
            let dataImg = data.image;
            console.log(dataImg);
            
            //add title to watchlist
            $("#want-row").append("<div id='title' class='want-to-watch column has-text-centered'><figure class='image is-inline-block'><img src='"+dataImg+"'</figure><p class='is-size-7' id='anime-title'>"+dataTitle+"</p></div>");
            dragdrop();
        })
    }

}

//save and reset buttons for localStorage
$("#savebtn").click(function(){
    savetitles();
})

function savetitles() {
    localStorage.setItem("titles",JSON.stringify(titles));
}

$("#resetbtn").click(function(){
    localStorage.clear();
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
                })
                let status = $(this).parent().attr("id").replace("-row", "");
                titles[status]=temparray;
                savetitles();
                console.log(titles);
            })
        }
    })
}

getAnimeQuote();

function getAnimeQuote() {
    fetch('https://animechan.vercel.app/api/random')
    .then(res => res.json())
    .then(quote => console.log(quote));
}


loadtitles();