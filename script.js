// 카드를 클릭하면 모달창 띄우기
const cards_box = document.getElementsByClassName("card");
for (var i = 0; i < cards_box.length; i++) {
  cards_box[i].addEventListener("click", function () {
    alert(this.textContent);
  });
}
// 탑버튼
document.querySelector(".btn_top").addEventListener("click", function (event) {
  event.preventDefault();
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

//검색버튼 누르면 되게하기
document
  .querySelector(".search_btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

//검색버튼을 클릭하면 나타나고 클릭하면 닫기
//
let nav_search = document.querySelector(".nav_search");
let search_box = document.getElementById("movie_search");
nav_search.addEventListener("click", function () {
  if (search_box.classList.contains("hide")) {
    search_box.classList.add("show");
    search_box.classList.remove("hide");
  } else {
    search_box.classList.add("hide");
    search_box.classList.remove("show");
  }

  // 검색창 옆에 X 클릭하면 닫기
  document
    .querySelector(".search_btn_close")
    .addEventListener("click", function () {
      let search_box = document.getElementById("movie_search");
      search_box.classList.add("hide");
      search_box.classList.remove("show");
    });
});

/*TMDB설치*/
document.addEventListener("DOMContentLoaded", function () {
  let movie_url =
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=3508739bb6efd7ac5c0d7987f4f50eee";
  fetch(movie_url)
    .then((res) => res.json())
    .then((data) => {
      let movie_list = data["results"];
      movie_list.forEach((movie_box) => {
        let movie_title = movie_box["title"];
        let movie_overview = movie_box["overview"];
        let movie_rating = movie_box["vote_average"];
        let movie_poster = movie_box["poster_path"];
        let movie_date = movie_box["release_date"];
        let movie_id = movie_box["id"];

        // 메인페이지 영화카드에 overview 데이터가 없을때 "줄거리가 없습니다."라고 출력
        if (!movie_overview) {
          movie_overview = "줄거리가 없습니다.";
        }

        let movie_year = movie_date.substring(0, 4); //2023-10-10 이렇게 나오는것을 2023만 출력하기 위해서 사용

        let temp_html = `    <div class="card" id="${movie_id}">
                            <p><img src="https://image.tmdb.org/t/p/original${movie_poster}"></p>
                            <h3 class="title">${movie_title}</h3>
                            <div class="txt">${movie_overview}</div>
                            <p class="rating">⭐ ${movie_rating}</p>
                            <p class="movie_date">🎬 ${movie_year}</p>
                          </div>`;
        document
          .querySelector("#card_box")
          .insertAdjacentHTML("beforeend", temp_html);
        // console.log(movie_poster);
      });
      const movie_cards_box = document.querySelectorAll(".card");
      //
      movie_cards_box.forEach(function (card) {
        card.addEventListener("click", function () {
          // alert("선택한 영화: " + card.id); // ID alert창 -> 상세페이지 이동으로 변경
          let movieId = this.id;
          let movieDetailUrl = `review.html?id=${movieId}`;
          window.location.href = movieDetailUrl;
        });
      });
    });
}); //document ready

document.querySelector(".search_btn").addEventListener("click", function () {
  let searchText = document.querySelector(".search_txt").value;
  let search_movie_list = document.querySelectorAll(".card .title"); //search_movie_list.length의 길이가 '20'으로 출력됨을 확인함
  let searchCount = 0;

  // 검색어가 입력되지 않았을 시 처리
  if (searchText.length === 0) {
    alert("검색어를 입력해주세요");
    return;
  }

  // 3. 만약에 영화제목(input 텍스트에 입력한 값이)랑
  for (i = 0; i < search_movie_list.length; i++) {
    if (search_movie_list[i].innerHTML.includes(searchText)) {
      search_movie_list[i].parentElement.style = "display:block";
      searchCount++;
    } else {
      search_movie_list[i].parentElement.style = "display:none";
    }
  }

  // 영화 검색결과가 없을 시 alert 메세지 출력, 최초화면으로 새로고침
  if (searchCount === 0) {
    alert("검색결과가 없습니다.");
    window.location.reload();
  }

  //console.log(document.querySelectorAll('.card .title').length);
});

window.addEventListener("scroll", function () {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  if (scrollTop >= 3377) {
    document.getElementById("btn_top").classList.add("btn_location");
  } else {
    document.getElementById("btn_top").classList.remove("btn_location");
  }
});

//alert id
