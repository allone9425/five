import { slangFilter } from "./slangFilter.js";

//닫기
document
  .querySelector(".review_btn_close")
  .addEventListener("click", function () {
    document.querySelector(".review_input_box").style.display = "none";
  });

document
  .getElementById("review_btn_open")
  .addEventListener("click", function () {
    document.querySelector(".review_input_box").style.display = "block";
  });

document
  .querySelector(".review_input_box_frame")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const reviewUser = document.querySelector(".review_input_name").value;
    const reviewPassword = document.querySelector(".review_input_pw").value;
    const reviewComments = document.querySelector(".review_input_text").value;
    const reviewRate = document.querySelector(".star_rating_number").innerText;

    if (slangFilter(reviewComments)) {
      alert("비속어가 포함되었습니다. 다시 입력해주세요");
      return;
    }

    const reviewObjectString = `
    {\"user\":${reviewUser},
    \"pw\":${reviewPassword},
    \"comments\":${reviewComments},
    \"rate\":${reviewRate},}
    `;

    // localStorage 중 현재 ID의 영화 리뷰 키를 필터링하는 코드
    const thisMovieReviews = Object.keys(localStorage).filter((review) =>
      // 영화 고유한 id가 들어가야함
      review.includes("123")
    );

    // 필터링한 현재영화 리뷰의 수를 파악하여 댓글에 ID(인덱스)를 주는 과정
    localStorage.setItem(
      `${123}_${thisMovieReviews.length + 1}`,
      reviewObjectString
    );
  });

document
  .querySelector(".review_input_box")
  .addEventListener("click", function (e) {
    if (e.target == document.querySelector(".review_input_box")) {
      document.querySelector(".review_input_box").style.display = "none";
    }
  });

//좋아요 버튼
let likeBtn = document.getElementById("like-btn");
let likeCounter = document.getElementById("like-count");

// 별점 숫자 표시
document.querySelectorAll(".star_radio").forEach((item) => {
  item.addEventListener("change", function () {
    const query = `label[for='${item.id}']`;
    const rate = document.querySelector(query).title;
    document.querySelector(".star_rating_number").innerHTML = rate;
  });
});

//로컬 스토리지에서 좋아요~ 상태 불러옴
let isLiked = localStorage.getItem("isLiked") === "true" || false;
let likeCount = parseInt(localStorage.getItem("likeCount")) || 0;

function toggleLike() {
  isLiked = !isLiked;
  likeCount = isLiked ? likeCount + 1 : likeCount - 1;

  localStorage.setItem("isLiked", isLiked);
  localStorage.setItem("likeCount", likeCount);

  updateLike();
}

// const updateLike = () =>{
//   likeBtn.
// }

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

const addCard = () => {};
