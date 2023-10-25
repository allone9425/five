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

    slangFilter(reviewComments);
    localStorage.setItem(`${"movieId"}_user`, reviewUser);
    localStorage.setItem(`${"movieId"}_pw`, reviewPassword);
    localStorage.setItem(`${"movieId"}_comments`, reviewComments);
  });

document
  .querySelector(".review_input_box")
  .addEventListener("click", function (e) {
    if (e.target == document.querySelector(".review_input_box")) {
      document.querySelector(".review_input_box").style.display = "none";
    }
  });
