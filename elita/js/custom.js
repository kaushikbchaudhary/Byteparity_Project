"use strict";

let imgs = document.querySelectorAll(".slider img");
let dots = document.querySelectorAll(".dot");
let currentImg = 0; // index of the first image
const interval = 3000; // duration(speed) of the slide

function changeSlide(n) {
  for (let i = 0; i < imgs.length; i++) {
    // reset
    imgs[i].style.opacity = 0;
    dots[i].className = dots[i].className.replace("active", "");
  }
  currentImg = n;
  imgs[currentImg].style.opacity = 1;
  dots[currentImg].className += " active";
}

const date = new Date();
document.getElementById(
  "date"
).textContent = `${date.getDay()}/${date.getMonth()}/${date.getYear()}`;

// $(".single-item").slick();
let buttonCheck = false;
document.querySelector(".toggal-btn").addEventListener("click", function () {
  // console.log("button clicked");

  if (window.matchMedia("(max-width: 991px)").matches) {
    buttonCheck = !buttonCheck;
    if (buttonCheck === true) {
      document.querySelector("ul").style.display = "block";
    } else if (buttonCheck === false) {
      document.querySelector("ul").style.display = "none";
    }
  }

  if (window.matchMedia("(min-width: 992px)").matches) {
    buttonCheck = !buttonCheck;
    if (buttonCheck === true) {
      document.querySelector("ul").style.display = "flex";
    } else if (buttonCheck === false) {
      document.querySelector("ul").style.display = "none";
    }
  }
});
// Create a media condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia("(max-width: 991px)");
// Check if the media query is true
if (mediaQuery.matches) {
  // slider for testimonial
  $(".testimonial-slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  $(".grid").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
} else {
  $(".testimonial-slider").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
  });
}
