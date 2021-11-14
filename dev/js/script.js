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
    $("#want-row").append("<div class='column has-text-centered'><figure class='image is-inline-block'><img src='"+saikiimgurl+"'</figure><p class='is-size-7' id='anime-title'>"+saikititle+"</p></div>");
    titlesarray.push({title: saikititle, id: saikiid, coverurl: saikiimgurl});
})

let fruitsbasketurl = "https://api.jikan.moe/v3/anime/38680";
$.get(fruitsbasketurl, function(fbdata) {
    let fbtitle = fbdata.title;
    console.log(fbtitle)

    let fbid = fbdata.mal_id;
    console.log(fbid);

    let fbimgurl = fbdata.image_url;
    console.log(fbimgurl);
    
    //add title to watchlist
    $("#want-row").append("<div class='column has-text-centered'><figure class='image is-inline-block'><img src='"+fbimgurl+"'</figure><p class='is-size-7' id='anime-title'>"+fbtitle+"</p></div>");
    titlesarray.push({title: fbtitle, id: fbid, coverurl: fbimgurl});
})

let myheroacademiaurl = "https://api.jikan.moe/v3/anime/31964";
$.get(myheroacademiaurl, function(mhadata) {
    let mhatitle = mhadata.title;
    console.log(mhatitle)

    let mhaid = mhadata.mal_id;
    console.log(mhaid);

    let mhaimgurl = mhadata.image_url;
    console.log(mhaimgurl);
    
    //add title to watchlist
    $("#want-row").append("<div class='column has-text-centered'><figure class='image is-inline-block'><img src='"+mhaimgurl+"'</figure><p class='is-size-7' id='anime-title'>"+mhatitle+"</p></div>");
    titlesarray.push({title: mhatitle, id: mhaid, coverurl: mhaimgurl});
})

let macrossfrontierurl = "https://api.jikan.moe/v3/anime/3572";
$.get(macrossfrontierurl, function(macrossdata) {
    let macrosstitle = macrossdata.title;
    console.log(macrosstitle)

    let macrossid = macrossdata.mal_id;
    console.log(macrossid);

    let macrossimgurl = macrossdata.image_url;
    console.log(macrossimgurl);
    
    //add title to watchlist
    $("#want-row").append("<div class='column has-text-centered'><figure class='image is-inline-block'><img src='"+macrossimgurl+"'</figure><p class='is-size-7' id='anime-title'>"+macrosstitle+"</p></div>");
    titlesarray.push({title: macrosstitle, id: macrossid, coverurl: macrossimgurl});
})

//save and reset buttons for localStorage
$("#savebtn").on("click", function(){
    localStorage.setItem("saved titles",JSON.stringify(titlesarray));
})

$("#resetbtn").on("click", function(){
    localStorage.clear();
})

//add capability to drag and drop