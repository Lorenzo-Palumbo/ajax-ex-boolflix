$(document).ready(function(){
    var source = $('#films-template').html();
    var template = Handlebars.compile(source);

    $('.search').click(function(){
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
                        lingua: film.original_language,
                        voto:film.vote_average
                     };
                     var html = template(context);
                     $('.films-trovati').append(html);
                }
            },
            error: function(){
                alert('error')
            }
        });
    });
});
