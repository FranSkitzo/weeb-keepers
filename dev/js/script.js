//get information (or at least saved title) from localstorage "watchlist"

let titlesarray= [
    {
        title: "",
        id: "",
        coverurl: "",
    }
]

console.log(titlesarray);

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
    $("#want-row").append("<div id='title' class='column has-text-centered'><figure class='image is-inline-block'><img src='"+saikiimgurl+"'</figure><p class='is-size-7' id='anime-title'>"+saikititle+"</p></div>");
    makedraggable();
})

//save and reset buttons for localStorage
$("#savebtn").on("click", function(){
    localStorage.setItem("saved titles",JSON.stringify(titlesarray));
})

$("#resetbtn").on("click", function(){
    localStorage.clear();
})

//add capability to drag and drop
function makedraggable() {
    $("#title").draggable( {
        
    }

    );
}