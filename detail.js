let movieId;

const urlParams = new URLSearchParams(window.location.search);
movieId = urlParams.get("id");
console.log(movieId);

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTA4NzM5YmI2ZWZkN2FjNWMwZDc5ODdmNGY1MGVlZSIsInN1YiI6IjY1MmYzYjYzZWE4NGM3MDEwYzFkZDYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2JhSAs7vPbaBQlp1r4qNy6zPm14hpWTUpuWliP6fwRk",
  },
};

await fetch(movieDetailUrl, options)
  .then((response) => response.json())
  .then((data) => {
    // 여기서 영화 상세 정보를 처리합니다.
    let movie_title = data["title"];
    let movie_overview = data["overview"];
    let movie_rating = data["vote_average"];
    let movie_poster = data["poster_path"];
    let movie_date = data["release_date"];
    console.log(data);
  })
  .catch((err) => console.error(err));
