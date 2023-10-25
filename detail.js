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
    let movie_genres = data["genres"];
    console.log(data);

    // 아래에 제목, 평점 등등 구간에 맞게 데이터 넣기
    let temp_html = `
    <div class="">
    <img class="w-30" src="https://image.tmdb.org/t/p/original${movie_poster}"/>
    <div class="">
      <div class="Flex_c p_07 font40">
        <h1 class="">영화제목</h1>
        <h1 class="">${movie_title}</h1>
      </div>
      <div class="gap font50">
        <div>
          <span class="">개봉 :</span>
          <span>${movie_date}</span>
        </div>
        <div>
          <span class="">장르 :</span>
          <span>${movie_genres}</span>
        </div>
        <div>
          <span class="">등급 :</span>
          <span>19세 이상관람가능</span>
        </div>
        <div>
          <span class="">평점 :</span>
          <span>${movie_rating}</span>
        </div>
        <div>
          <span class="">누적관객 :</span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
    `;
  })
  .catch((err) => console.error(err));
