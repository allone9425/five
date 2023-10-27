const urlParams = new URLSearchParams(window.location.search);
export let movieId = urlParams.get("id");
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
    let movie_original_title = data["original_title"];
    let movie_overview = data["overview"];
    let movie_rating = data["vote_average"];
    if (typeof movie_rating !== "undefined") {
      movie_rating = movie_rating.toFixed(1);
    } else {
      movie_rating = "N/A"; // 또는 다른 기본값 설정
    }
    let movie_poster = data["poster_path"];
    let movie_date = data["release_date"];
    let movie_runtime = data["runtime"];
    console.log(data);

    // 상세페이지 영화카드에 overview 데이터가 없을때 "줄거리가 없습니다."라고 출력
    if (!movie_overview) {
      movie_overview = "줄거리가 없습니다.";
    }

    // 아래에 제목, 평점 등등 구간에 맞게 데이터 넣기
    let temp_html = ` 
    <div class="img">
      <img class="poster" src="https://image.tmdb.org/t/p/original${movie_poster}"/>
    </div>
    <div class="content">
      <div class="titlebox">
        <h1 class="content_headtitle">${movie_title}</h1>
        <h1 class="content_headtitle margin_b">${movie_original_title}</h1>
      </div>
      <div class="">
      <div class="margin_b content_font">
      <span class="">개봉 : </span>
      <span>${movie_date}</span>
      </div>
      <div class="margin_b content_font">
      <span class="">평점 : </span>
      <span>${movie_rating}점</span>
      </div>
      <div class="margin_b content_font">
      <span>상영 시간 : </span>
      <span>${movie_runtime}분</span>
      </div>
    </div>
    </div>
    
    <div class="story">
     <div class="padding_15">
      <h1 class="content_headtitle margin_b margin_t synopsis">줄거리</h1>
       <p class="content_font synopsis_txt">${movie_overview}</p>
      </div>
    </div>
    `;
    document
      .querySelector(".container")
      .insertAdjacentHTML("beforeend", temp_html);
  });

// 탑버튼
document.querySelector(".btn_top").addEventListener("click", function (event) {
  event.preventDefault();
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});
