function searchMovie() {
    $('#movie-list').html('')
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'bc53046d',
            's': $('#search-input').val()
        },
        success: function(result) {
            
            if(result.Response == "True") {
                let movies = result.Search
            

                $.each(movies, function(i, data){
                    $('#movie-list').append(`
                        <div class="col-md-3 align-items-center">
                            <div class="card ">
                                <img src="${data.Poster}" class="card-img-top " style="max-height:371px;">
                                <div class="card-body">
                                    <h5 class="card-title">${data.Title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                    <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#modalId" data-id="${data.imdbID}">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `)
                })

                $('#search-input').val('')

            }else {
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">${result.error}</h1>
                </div>`)
            }
        }
    })
}

$('#search-btn').on('click', function (){
  searchMovie() 
})

$('#search-input').on('keyup', function(e){
    if(e.which === 13) {
        searchMovie()
    }
})

/// event binding
$('#movie-list').on('click', '.see-detail', function(){

    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey' : 'bc53046d',
            'i' : $(this).data('id')
        },
        success: function(movie){
            if(movie.Response === 'True') {
                
                $('.modal-body').html(`
                    <div class="container-sm">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${movie.Poster}" class="img-lg"
                            </div>
                            <div class="col-md-6" style="width:auto; height:552px; ">
                                <ul class="list-group">

                                    <li class="list-group-item">
                                        <h3>${movie.Title}</h3>
                                    </li>

                                    <li class="list-group-item">Released: ${movie.Released}</li>
                                    <li class="list-group-item">Genre: ${movie.Genre}</li>
                                    <li class="list-group-item">Director: ${movie.Director}</li>
                                    <li class="list-group-item">Actors: ${movie.Actors}</li>

                                </ul>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    })
})

