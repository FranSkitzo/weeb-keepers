let animeSearch = 'https://api.jikan.moe/v3/search/anime?q=';
let generalApi = 'https://api.jikan.moe/v3/'
let searchInput = $('#search-input');
let searchBtn = $('#search-btn');
let animeList = [];
let animeListEl = $('.anime-list');
let airingListEl = $(".top-airing");
let tendingAnimeEl = $(".top-anime");
let animeDisplayed = false;


// fetches anime titles directly corresponding to the user input that was provided in searchInput
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
        createCards(animeList, false, animeListEl);
    }).catch(err => {
        console.log(err);
    });
    
});

$(function() {
    $('.anime-list').on('click', '.card', function() {
        $(this).find('.card-info').css('display', 'contents');
        console.log("clicked");
    });
});


// refreshes the anime list and clears the old elements off the page 
function refreshAnimeList() {
    animeList = [];
    $('.card').remove();
    $('.card-img').remove();
}

// fetches for the top anime that are currently airing
function getTopAnime() {
    console.log('getting top anime');
    fetch(generalApi + 'top/anime')
    .then(res => res.json())
    .then(data => {
        console.log(data.top);
        createCards(data.top, true, tendingAnimeEl);
    });

    fetch(generalApi + 'top/anime/'+1+'/airing')
    .then(res => res.json())
    .then(data => {
        console.log(data.top);
        createCards(data.top, true, airingListEl);
    });
}

// createCards function is a boilerplate function that makes generating elements easier
function createCards(list, isTop, el) {
    if(!isTop) {
        for(let i = 0; i < list.length; i++) {
            let animeCard = document.createElement('div');
            let animeImg = document.createElement('img');
            let animeTitle = document.createElement('h4');
            let animeInfo = document.createElement('div');

            $(animeImg).attr('src', list[i].image_url);
            $(animeTitle).text(list[i].title);
            $(animeCard).addClass('card');
            $(animeImg).addClass('card-img card');
            $(animeInfo).addClass('card-info');
            $(animeInfo).html('<ul> <li>Airing period: ' + list[i].start_date.slice(0, 10) + ' - '
             + list[i].end_date.slice(0, 10) + '</li> <li> Rated: '+ list[i].rated +
             '</li> <li> Episodes: '+list[i].episodes.toString() +
             '</li> <li>Score: '+list[i].score.toString() +'</li> <li>Type: '+list[i].type+
             '</li> <li> Synopsis: '+list[i].synopsis+'</li></ul>');
            $(animeCard).append(animeImg);
            $(animeCard).append(animeInfo);
            $(animeCard).append(animeTitle);
            $(el).append(animeCard);
        }
    }else {
        for(let i = 0; i < list.length; i++) {
            let animeCard = document.createElement('div');
            let animeImg = document.createElement('img');
            let animeTitle = document.createElement('h4');
            let animeRank = document.createElement('h5');
            $(animeImg).attr('src', list[i].image_url);
            $(animeTitle).text(list[i].title);
            $(animeCard).addClass('card');
            $(animeImg).addClass('card-img card');
            $(animeRank).text('.' + list[i].rank);
            $(animeCard).append(animeRank);
            $(animeCard).append(animeImg);
            $(animeCard).append(animeTitle);
            $(el).append(animeCard);
        }
    }
}

getTopAnime();