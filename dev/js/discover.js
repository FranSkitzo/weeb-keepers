let animeSearch = 'https://api.jikan.moe/v3/search/anime?q=';
let generalApi = 'https://api.jikan.moe/v3/'
let searchInput = $('#search-input');
let searchBtn = $('#search-btn');
let animeList = [];
let watchList = loadFromLocal() || [];
let animeListEl = $('.anime-list');
let airingListEl = $(".top-airing");
let trendingAnimeEl = $(".top-anime");
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
        airingListEl.hide();
        airingListEl.parent().hide();
        trendingAnimeEl.hide();
        trendingAnimeEl.parent().hide();
        
    }).catch(err => {
        console.log(err);
    });
    
});

// hover functionality for cards that the user searched for
$(function() {
    $('.anime-list, .top-anime, .top-airing').on('mouseover', '.card', (e) => {
        let id = e.currentTarget.className.split('id-')[1];
        $('.id-' + id).find('.card-info').show();
        console.log(e.target);
    });

    $('.anime-list, .top-anime, .top-airing').on('mouseout', '.card', (e) => {
        let id = e.currentTarget.className.split('id-')[1];
        $('.id-' + id).find('.card-info').hide();
        console.log(e.target);
    });

    // on click, get this to save to local storage tomorrow
    $('.anime-list, .top-anime, .top-airing').on('click', '.panel-btn', (e) => {
        let id = e.currentTarget.parentNode.parentNode.className.split('id-')[1];
        let cardObj = {
            image: $('.id-'+id).css('background-image'),
            title: $('.id-'+id).find('.panel-title').text()
        }
        watchList.push(cardObj);
        saveToLocal(watchList);
        console.log(watchList);
    });

    $('.anime-list, .top-anime, .top-airing').on('click', '.panel-btn-info', (e) => {
        let id = e.currentTarget.parentNode.parentNode.className.split('id-')[1];
        window.location.replace($('.id-'+id).find('.mal-url').attr('href'));
        console.log($('.id-'+id).find('.mal-url').attr('href'));
    });
});


// refreshes the anime list and clears the old elements off the page 
function refreshAnimeList() {
    animeList = [];
    $('.panel').remove();
    //$('.card-img').remove();
}

// fetches for the top anime that are currently airing
function getTopAnime() {
    console.log('getting top anime');
    fetch(generalApi + 'top/anime/'+1+'/bypopularity')
    .then(res => res.json())
    .then(data => {
        console.log(data.top);
        createCards(data.top, true, trendingAnimeEl);
    });
}

// createCards function is a boilerplate function that makes generating elements easier
function createCards(list, isTop, el) {
    if(!isTop) {
        for(let i = 0; i < list.length; i++) {
            let cardCol = document.createElement('div');
            let animeCard = document.createElement('div');
            let animeImg = document.createElement('img');
            let animeTitle = document.createElement('h4');
            let animeInfo =  document.createElement('div');
            let animeBody = document.createElement('p');
            let addBtn = document.createElement('button');
            let moreInfoBtn = document.createElement('button');
            let malURL = document.createElement('a');
            let animeBodyInfo = '<ul><li> Rated: '+ list[i].rated + '</li> <li> Episodes: '+list[i].episodes.toString() + '</li> <li>Score: '+list[i].score.toString() +'</li></ul>';
            $(cardCol).addClass('column my-4');
            //$(animeImg).attr('src', list[i].image_url);
            $(malURL).attr('href', list[i].url);
            $(malURL).addClass('mal-url');
            $(malURL).text(list[i].url);
            $(malURL).hide();
            $(animeTitle).text(list[i].title);
            $(animeTitle).addClass('panel-title');
            $(animeCard).addClass('panel id-'+i.toString());
            $(animeCard).css('background-image', 'url('+list[i].image_url+')')
            //$(animeImg).addClass('card-img');
            $(animeInfo).addClass('panel-content');
            $(animeBody).addClass('panel-body');
            $(addBtn).addClass('panel-btn');
            $(moreInfoBtn).addClass('panel-btn-info');
            $(addBtn).text('Add to List');
            $(moreInfoBtn).text('More Info');
            $(animeBody).html(animeBodyInfo);
            $(animeInfo).append(animeTitle);
            $(animeInfo).append(animeBody);
            $(animeInfo).append(addBtn);
            $(animeInfo).append(moreInfoBtn);
            $(animeCard).append(animeImg);
            $(animeCard).append(malURL);
            //$(animeCard).append(animeTitle);
            $(animeCard).append(animeInfo);
            $(cardCol).append(animeCard);
            $(el).append(cardCol);
            
        }
    }else {
        for(let i = 0; i < list.length; i++) {
            let cardCol = document.createElement('div');
            let animeCard = document.createElement('div');
            let animeImg = document.createElement('img');
            let animeTitle = document.createElement('h4');
            let animeInfo =  document.createElement('div');
            let animeBody = document.createElement('p');
            let addBtn = document.createElement('button');
            let moreInfoBtn = document.createElement('button');
            let malURL = document.createElement('a');
            let animeBodyInfo = '<ul> <li>Episodes: '+list[i].episodes+
            '</li> <li>Rank: '+list[i].rank.toString()+'</li> <li>Score: '+list[i].score.toString()+
            '</li></ul>';
            $(cardCol).addClass('column my-4');
            //$(animeImg).attr('src', list[i].image_url);
            $(malURL).attr('href', list[i].url);
            $(malURL).addClass('mal-url');
            $(malURL).text(list[i].url);
            $(malURL).hide();
            $(animeTitle).text(list[i].title);
            $(animeTitle).addClass('panel-title');
            $(animeCard).addClass('panel id-'+i.toString());
            $(animeCard).css('background-image', 'url('+list[i].image_url+')')
            //$(animeImg).addClass('card-img');
            $(animeInfo).addClass('panel-content');
            $(animeBody).addClass('panel-body');
            $(addBtn).addClass('panel-btn');
            $(moreInfoBtn).addClass('panel-btn-info');
            $(addBtn).text('Add to List');
            $(moreInfoBtn).text('More Info');
            $(animeBody).html(animeBodyInfo);
            $(animeInfo).append(animeTitle);
            $(animeInfo).append(animeBody);
            $(animeInfo).append(addBtn);
            $(animeInfo).append(moreInfoBtn);
            $(animeCard).append(animeImg);
            $(animeCard).append(malURL);
            //$(animeCard).append(animeTitle);
            $(animeCard).append(animeInfo);
            $(cardCol).append(animeCard);
            $(el).append(cardCol);
        }
    }
}

/*function Card(title, body, img,  info, addBtn, infoBtn) {
    this.title = title;
    this.body = body;
    this.img = img;
    this.info = info;
    this.addBtn = addBtn;
    this.infoBtn = infoBtn;
}*/

function saveToLocal(item) {
    localStorage.setItem('card-list', JSON.stringify(item)); 
}

function loadFromLocal() {
    return JSON.parse(localStorage.getItem('card-list'));
}

getTopAnime();