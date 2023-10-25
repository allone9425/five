const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKEY}&language=ko-KR`;

fetch(movieDetailUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.error(err));
