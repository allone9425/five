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
    let movie_original_title = data["original_title"];
    let movie_overview = data["overview"];
    let movie_rating = data["vote_average"].toFixed(1);
    let movie_poster = data["poster_path"];
    let movie_date = data["release_date"];
    let movie_runtime = data["runtime"];
    console.log(data);

    // 아래에 제목, 평점 등등 구간에 맞게 데이터 넣기
    let temp_html = `
    <div class="box Flex p_07" style="background-color:beige">
    <img class="w-30" src="https://image.tmdb.org/t/p/original${movie_poster}"/>
    <div class="Flex_c pl_13 font40" style="background-color:skyblue">
      <div class="" style="background-color:orange">
        <h1 class=""><string>${movie_title}</string></h1>
        <h1 class=""><string>${movie_original_title}</string></h1>
      </div>
      <div class="gap font50 m_40">
        <div>
          <span class="">개봉 :</span>
          <span>${movie_date}</span>
        </div>
        <div>
          <span class="">평점 :</span>
          <span>${movie_rating}점</span>
        </div>
        <div>
          <span class="">상영 시간 : </span>
          <span>${movie_runtime}분</span>
        </div>
        <div>
              <button class="review_btn font25" id="review_btn">
                리뷰 남기기
              </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="w-30 Flex_c p_07 m_70 gap"  style="background-color:yellowgreen">
      <div class="font50">줄거리</div>
      <div>${movie_overview}</div>
    </div>
    `;
    document
      .querySelector(".detailbox")
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
