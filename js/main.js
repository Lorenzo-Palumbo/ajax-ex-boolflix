$(document).ready(function(){
    var source = $('#films-template').html();
    var template = Handlebars.compile(source);

    $('.search').click(function(){
        cerca();
    });
    $('.input-film').keypress(function(event){
        if (event.key == 'Enter') {
            cerca();
        }
    });

    function cerca(){
        var filmInput = $('.input-film').val();
        if (filmInput.length !== 0) {
            apiRicercaFilm(filmInput);
            apiRicercaSerie(filmInput);
        }else {
            alert('Inserire testo');
        }
        $('.films-trovati').empty();

    };
//Funzione per ricercare tramite nome film in input il corrispettivo api
    function apiRicercaFilm(filmInput){
        var apiBaseUrl = 'https://api.themoviedb.org/3';
        $.ajax({
            url: apiBaseUrl + '/search/movie',
            data:{
                api_key: '028c6c0b5dafcb0ed69b45392117aab6',
                query: filmInput,
                language: 'it-IT'
            },
            method:'GET',
            success: function(data){
                var films = data.results;
                console.log(films);
                stampaFilm(films);
            },
            error: function(){
                alert('error')
            }
        });
    };

    function apiRicercaSerie(filmInput){
        var apiBaseUrl = 'https://api.themoviedb.org/3';
        $.ajax({
            url: apiBaseUrl + '/search/tv',
            data:{
                api_key: '028c6c0b5dafcb0ed69b45392117aab6',
                query: filmInput,
                language: 'it-IT'
            },
            method:'GET',
            success: function(data){
                var films = data.results;
                console.log(films);
                stampaFilm(films);
                stampaSerie(films);
            },
            error: function(){
                alert('error')
            }
        });
    };

//Funzione per prendere dati da api e stamparli
    function stampaFilm(films){
        for (var i = 0; i < films.length; i++) {
            var film = films[i];

            var context = {
                titolo: film.title,
                originale: film.original_title,
                lingua: flags(film.original_language),
                language: film.original_language,
                stelle: stars(film.vote_average),
                poster: film.poster_path
             };
             var html = template(context);
             $('.films-trovati').append(html)
        }
    };

    function stampaSerie(films){
        for (var i = 0; i < films.length; i++) {
            var film = films[i];

            var context = {
                titolo: film.name,
                originale: film.original_name,
                lingua: flags(film.original_language),
                language: film.original_language,
                stelle: stars(film.vote_average),
                poster: film.poster_path
             };
             var html = template(context);
             $('.films-trovati').append(html);
        }
    };

//Funzione per mettere bandiera in lingua
    function flags(language){
        if (language == 'en') {
            var language = 'us' ;
        }else if (language == 'ja') {
            var language = 'jp' ;
        }else if (language == 'cs') {
            var language = 'cz' ;
        }else {

        }
        return language
    };

//Altra funzione per bandiera in lingua

    // function flags(lang){
    //     var availableFlags = [
    //         'en',
    //         'it'
    //     ];
    //     if (availableFlags.includes(language)) {
    //         var flag = '<img src="img/flags/' + lang + '.svg" alt="' + lang +'">'; //Immagini che andrebbero messe in cartella interna
    //         return flag;
    //     }
    //     return lang
    // };

//Funzione per creare stelle in maniera dinamica
    function stars(voto){
        var cinque = voto/2;
        var stelle = Math.ceil(cinque);

        var htmlStelle = "";
        for(var s = 1; s <= 5; s++) {
            if (s <= stelle) {
                htmlStelle += '<i class="fas fa-star"></i>';
            } else {
                htmlStelle += '<i class="far fa-star"></i>';
            }
        }
        return htmlStelle
    };

});
