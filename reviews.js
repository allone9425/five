import { slangFilter, userFilter, userPW, userInput } from "./filter.js";
import { movieId } from "./detail.js";
//닫기
document
  .querySelector(".review_btn_close")
  .addEventListener("click", function () {
    document.querySelector(".review_input_box").style.display = "none";
    document.querySelector("body").style.overflow = "visible";
  });

document
  .querySelector(".check_pw_btn_close")
  .addEventListener("click", function () {
    document.querySelector(".check_pw").style.display = "none";
    document.querySelector(".check_pw_frame").style.display = "none";
    document.querySelector("body").style.overflow = "visible";
  });

document
  .getElementById("review_btn_open")
  .addEventListener("click", function () {
    document.querySelector(".review_input_box").style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
  });

document
  .querySelector(".review_input_box_frame")
  .addEventListener("submit", function (e) {
    try {
      e.preventDefault();

      const reviewUser = document.querySelector(".review_input_name").value;
      const reviewPassword = document.querySelector(".review_input_pw").value;
      const reviewComments = document.querySelector(".review_input_text").value;
      const reviewRate = document.querySelector(
        ".star_rating_number"
      ).innerText;

      const urlParams = new URLSearchParams(window.location.search);
      const movieId = urlParams.get("id");

      if (slangFilter(reviewComments)) {
        throw new Error("비속어가 포함되었습니다. 다시 입력해주세요");
      }

      if (!userFilter(reviewUser)) {
        throw new Error("작성자를 입력하세요.");
      }
      if (!userPW(reviewPassword)) {
        throw new Error("패스워드를 입력하세요");
      }
      if (!userInput(reviewComments)) {
        throw new Error("내용을 입력하세요");
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
        review.includes(movieId)
      );

      const reviewId = Date.now();
      // 필터링한 현재영화 리뷰의 수를 파악하여 댓글에 ID(인덱스)를 주는 과정
      localStorage.setItem(`${movieId}_${reviewId}`, reviewObjectString);
      window.location.reload();
    } catch (err) {
      alert(err);
      e.preventDefault();
    }
  });

document
  .querySelector(".review_input_box")
  .addEventListener("click", function (e) {
    if (e.target == document.querySelector(".review_input_box")) {
      document.querySelector(".review_input_box").style.display = "none";
      document.querySelector("body").style.overflow = "visible";
    }
  });
document
  .querySelector(".check_pw_frame")
  .addEventListener("click", function (e) {
    if (e.target == document.querySelector(".check_pw_frame")) {
      document.querySelector(".check_pw_frame").style.display = "none";
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

const addCard = () => {
  const card_box = document.querySelector(".card-container__card");
  document.querySelectorAll(".movie-item").forEach((item) => {
    item.addEventListener("click", function () {
      const movieId = item.dataset.movieId;
      showReviewsForMovie(movieId);
    });
  });
  function showReviewsForMovie(movieId) {
    document.querySelector(".card-container ul").innerHTML = "";
  }

  const thisMovieReviews = Object.keys(localStorage).filter((review) =>
    // 영화 고유한 id가 들어가야함
    review.includes(movieId)
  );

  thisMovieReviews.forEach((CardKey) => {
    //데이터 불러오기
    const reviewCard = localStorage.getItem(CardKey);
    //console.log("리뷰" + reviewCard);
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
          
          <textarea class="text-modify" data-key="${CardKey}"></textarea>
      </div>

      <div class="card-container__card-check-good">
        <div>
          <figure><img src="./images/reviews_good.svg" /></figure>
          <span>${reviewData.like}</span>
        </div>
        <button class="like-btn" data-key="${CardKey}">좋아요</button>
        <button class="btn_modify" type="button" data-key="${CardKey}">수정</button>
        <button class="btn_delete" data-key="${CardKey}">삭제</button>
        <button class="btn_confirm" type="button" data-key="${CardKey}">확인</button>
        <button class="btn_cancel" data-key="${CardKey}">취소</button>
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
    document.querySelector(".check_pw").dataset["key"] = item.dataset["key"];
    document.querySelector(".check_pw").dataset["mode"] = "delete";
    document.querySelector(".check_pw").style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
    document.querySelector(".check_pw_frame").style.display = "block";
  });
});
document.querySelectorAll(".btn_modify").forEach((item) => {
  item.addEventListener("click", function () {
    document.querySelector(".check_pw").dataset["key"] = this.dataset["key"];
    document.querySelector(".check_pw").dataset["mode"] = "modify";

    document.querySelector(".check_pw").style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
    document.querySelector(".check_pw_frame").style.display = "block";
  });
});

// 비밀번호 비교
document.querySelector(".check_pw_btn").addEventListener("click", function () {
  const mode = this.parentElement.dataset["mode"];
  const currentReviewKey = this.parentElement.dataset["key"];
  const localStoragePW = JSON.parse(localStorage.getItem(currentReviewKey))[
    "pw"
  ];
  const userInputPW = document.querySelector(".check_pw_input").value;
  if (localStoragePW === userInputPW) {
    if (mode === "delete") {
      if (confirm("정말 삭제하시겠습니까?")) {
        localStorage.removeItem(currentReviewKey);
        window.location.reload();
      }
    } else if (mode === "modify") {
      document.querySelector(
        `.text-modify[data-key="${currentReviewKey}"]`
      ).style.display = "block";
      document.querySelector(
        `.btn_confirm[data-key="${currentReviewKey}"]`
      ).style.display = "block";
      document.querySelector(
        `.btn_cancel[data-key="${currentReviewKey}"]`
      ).style.display = "block";

      document.querySelector(
        `.btn_modify[data-key="${currentReviewKey}"]`
      ).style.display = "none";
      document.querySelector(
        `.btn_delete[data-key="${currentReviewKey}"]`
      ).style.display = "none";
      this.parentElement.parentElement.style.display = "none";
      // this.parentElement.style.display = "none";
    }
  } else {
    alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요");
    return;
  }
});

//수정클릭후 암호입력하고 수정다하고 확인버튼
document.querySelectorAll(".btn_confirm").forEach((item) => {
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
    localStorage.setItem(key, JSON.stringify(reviewData));
    console.log("reviewData.text는" + reviewData.comments); //첫번째 입력값만 됨
    console.log("reviewData는" + reviewData);
    console.log("item.dataset[key]는" + item.dataset["key"]); //각각 맞게 찍힘
    window.location.reload();
  });
});

//취소버튼 누르면 다닫히기
document.querySelectorAll(".btn_cancel").forEach(function (item) {
  item.addEventListener("click", function () {
    //closest https://developer.mozilla.org/ko/docs/Web/API/Element/closest
    let parentBox = item.closest(".card-container__card");
    //console.log(parentBox);
    parentBox.querySelector(".text-modify").style.display = "none";
    parentBox.querySelector(".btn_confirm").style.display = "none";
    parentBox.querySelector(".btn_cancel").style.display = "none";
    parentBox.querySelector(".btn_modify").style.display = "block";
    parentBox.querySelector(".btn_delete").style.display = "block";
  });
});
