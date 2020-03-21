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
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie',
            data:{
                api_key: '028c6c0b5dafcb0ed69b45392117aab6',
                query: filmInput,
                language: 'it-IT'
            },
            method:'GET',
            success: function(data){
                var films = data.results;
                for (var i = 0; i < films.length; i++) {
                    var film = films[i];

                    var context = {
                        titolo: film.title,
                        originale: film.original_title,
                        lingua: flags(film.original_language),
                        language: film.original_language,
                        stelle: stars(film.vote_average)
                     };

                     var html = template(context);
                     $('.films-trovati').append(html);
                }
            },
            error: function(){
                alert('error')
            }
        });
    };
    //Funzione per mettere bandiera in lingua
    function flags(language){
        // console.log(language);
        var lingue = ['ad', 'ae', 'af', 'ag', 'ai', 'al', 'an', 'am', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az', 'eu', 'bn', 'dz', 'bh', 'bi', 'br', 'bg', 'my', 'be', 'km', 'ca', 'zh', 'co', 'hr', 'cs', 'da', 'nl', 'eo', 'et', 'fo', 'fa', 'fj', 'fi', 'fr', 'fy', 'gd', 'gv',
         'gl', 'ka', 'de', 'el', 'kl', 'gn', 'gu', 'ht', 'ha', 'he', 'iw', 'hi', 'hu', 'is', 'io', 'id', 'in', 'ia', 'ie', 'iu', 'ik', 'ga', 'it', 'ja', 'jv', 'kn', 'ks', 'kk', 'rw', 'ky', 'rn', 'ko', 'ku', 'lo', 'la', 'lv', 'li', 'ln', 'lt', 'mk',
          'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mo', 'mn', 'na', 'ne', 'no', 'oc', 'or', 'om', 'ps', 'pl', 'pt', 'pa', 'qu', 'rm', 'ro', 'ru', 'sm', 'sg', 'sa', 'sr', 'st', 'tn', 'sn', 'ii', 'sd', 'si', 'ss', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv',
           'tl', 'tg', 'ta', 'tt', 'te', 'th', 'bo', 'ti', 'to', 'ts', 'tr', 'tk', 'tw', 'ug', 'uk', 'ur', 'uz', 'vi', 'vo', 'wa', 'cy', 'wo', 'xh', 'yi', 'ji', 'yo', 'zu'];
        // for (var i = 0; i < lingue.length; i++) {
            if (lingue.includes(language)) {

            }else {
                htmlLingua = language;
            
            }
    //     };
        return htmlLingua
    };

    //Creazione funzione per stelle in maniera dinamica
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
