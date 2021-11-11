let animeSearch = 'https://api.jikan.moe/v3/search/anime?q=';
let searchInput = $('#search-input');
let searchBtn = $('#search-btn');
let animeList = [];
let animeListEl = $('#anime-list');
let animeDisplayed = false;

searchBtn.on('click', () => {
    refreshAnimeList();
    console.log("click");
    fetch(animeSearch + searchInput.val())
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for(let i = 0; i < data.results.length; i++) {
            animeList[i] = data.results[i];
        }
        displayAnime();
    }).catch(err => {
        console.log(err);
    });
    
});

function displayAnime() {
    for(let i = 0; i < animeList.length; i++) {
        let animeCard = document.createElement('div');
        let animeImg = document.createElement('img');
        let animeTitle = document.createElement('h3');
        $(animeImg).attr('src', animeList[i].image_url);
        $(animeTitle).text(animeList[i].title);
        $(animeCard).addClass('card');
        $(animeImg).addClass('card-img card');
        $(animeCard).append(animeImg);
        $(animeCard).append(animeTitle);
        $(animeListEl).append(animeCard);
    }
}

function refreshAnimeList() {
    animeList = [];
    $('.card').remove();
    $('.card-img').remove();
}