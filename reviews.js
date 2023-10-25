import { slangFilter } from "./slangFilter.js";

//닫기
document
  .querySelector(".review_btn_close")
  .addEventListener("click", function () {
    document.querySelector(".review_input_box").style.display = "none";
  });

document
  .querySelector(".check_pw_btn_close")
  .addEventListener("click", function () {
    document.querySelector(".check_pw").style.display = "none";
  });

document
  .getElementById("review_btn_open")
  .addEventListener("click", function () {
    document.querySelector(".review_input_box").style.display = "block";
  });

document
  .querySelector(".review_input_box_frame")
  .addEventListener("submit", function (e) {
    const reviewUser = document.querySelector(".review_input_name").value;
    const reviewPassword = document.querySelector(".review_input_pw").value;
    const reviewComments = document.querySelector(".review_input_text").value;
    const reviewRate = document.querySelector(".star_rating_number").innerText;

    if (slangFilter(reviewComments)) {
      alert("비속어가 포함되었습니다. 다시 입력해주세요");
      e.preventDefault();
      return;
    }
    // 리뷰 정보를 JSON.stringify를 이용하여 문자열화.
    const reviewObject = {
      user: reviewUser,
      pw: reviewPassword,
      comments: reviewComments,
      rate: reviewRate,
      like: 0,
    };
    const reviewObjectString = JSON.stringify(reviewObject);

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

// 별점 숫자 표시
document.querySelectorAll(".star_radio").forEach((item) => {
  item.addEventListener("change", function () {
    const query = `label[for='${item.id}']`;
    const rate = document.querySelector(query).title;
    document.querySelector(".star_rating_number").innerHTML = rate;
  });
});

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

const addCard = () => {
  const card_box = document.querySelector(".card-container__card");
  const thisMovieReviews = Object.keys(localStorage).filter((review) =>
    // 영화 고유한 id가 들어가야함
    review.includes("123")
  );

  thisMovieReviews.forEach((CardKey) => {
    //데이터 불러오기
    const reviewCard = localStorage.getItem(CardKey);
    let reviewData = JSON.parse(reviewCard);
    //만들기
    let temp = `
    <li>
    <div class="card-container__card">
      <div class="card-container__card-first-line">
        <div>
          <figure><img src="./images/reviews_user.svg" /></figure>
          <span>${reviewData.user}</span>
        </div>
        <div class="card-container__card-rate">
          <figure><img src="./images/reviews_star.svg" /></figure>
          <span>${reviewData.rate}</span>
        </div>
      </div>
      <div class="text-area">
        <p>
          ${reviewData.comments} </p>
          
          <textarea class="text-modify"></textarea>
      </div>

      <div class="card-container__card-check-good">
        <div>
          <figure><img src="./images/reviews_good.svg" /></figure>
          <span>${reviewData.like}</span>
        </div>
        <button class="like-btn" data-key="${CardKey}">좋아요</button>
        <button class="btn_modify" type="button" data-key="${CardKey}">수정</button>
        <button class="btn_delete" data-key="${CardKey}">삭제</button>
      </div>
    </div>
  </li>
    `;
    document
      .querySelector(".card-container ul")
      .insertAdjacentHTML("beforeend", temp);
  });
};

// 각 카드 생성하고 화면에 추가하기
document.addEventListener("DOMContentLoaded", addCard());

const toggleLike = function (id) {
  let likeCount = localStorage.getItem(id);
  let reviewData = JSON.parse(likeCount); // 객체로 생긴 문자열을 객체타입으로
  reviewData["like"] = reviewData["like"] + 1;
  let changeReviewData = JSON.stringify(reviewData);
  localStorage.setItem(id, changeReviewData);
  window.location.reload();
};

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("like-btn")) {
    toggleLike(e.target.dataset["key"]);
  }
});

document.querySelectorAll(".btn_delete").forEach((item) => {
  item.addEventListener("click", function () {
    localStorage.removeItem(item.dataset["key"]);
    window.location.reload();
  });
});

document.querySelectorAll(".btn_modify").forEach((item) => {
  item.addEventListener("click", function () {
    const itemTextArea = this.parentElement.parentElement.querySelector(
      ".text-area .text-modify"
    );

    //수정할 대상의 Key를 가져오기
    const key = item.dataset.key;
    // 해당 Key에 저장된 데이터 가져오기
    const reviewCard = localStorage.getItem(key);
    let reviewData = JSON.parse(reviewCard);
    //textarea 변수 저장 textarea 클래스명 : .text-modify
    let textModify = itemTextArea.value;
    //textarea에 담은 데이터를 reviewData.text에 저장함
    reviewData.comments = textModify;
    //reviewData.push("텍스트"); -> 실패 ㅠ
    console.log("reviewData.text는" + reviewData.comments); //첫번째 입력값만 됨
    console.log("reviewData는" + reviewData);
    console.log("item.dataset[key]는" + item.dataset["key"]); //각각 맞게 찍힘
  });
});
