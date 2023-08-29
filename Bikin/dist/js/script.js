"use strict";


// Brand logo

// $('.brand').slick({
//   centerMode: true,
//   centerPadding: '60px',
//   slidesToShow: 3,
//   responsive: [
//     {
//       breakpoint: 768,
//       settings: {
//         arrows: false,
//         centerMode: true,
//         centerPadding: '40px',
//         slidesToShow: 3
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         arrows: false,
//         centerMode: true,
//         centerPadding: '40px',
//         slidesToShow: 1
//       }
//     }
//   ]
// });

// FAQ section
const accordionBtn = document.querySelectorAll(".accordion");
for (const acc of accordionBtn) {
  acc.addEventListener("click", function () {
    console.log(this.nextElementSibling);
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      acc.style.borderBottom = "1px solid #e2e5fe";
    } else {
      panel.style.display = "block";
      acc.style.border = "none";
    }
  });
}

const menuContent = document.querySelector(".navbar ul");
const togglebtn = document.querySelector(".toggal-btn");
let toggal = false;
const menuContentFun = function () {
  if (!toggal) {
    menuContent.style.display = 'block';
  } else {
    menuContent.style.display = 'none';
  }
  toggal = !toggal;
}
togglebtn.addEventListener("click", menuContentFun);

function mobailMedia(x) {
   if (x.matches) { // If media query matches
  // slider
     $(document).ready(function () {
       // slider for testimonial
       $(".testimonials-flex").slick({
         infinite: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         dots: true,
         autoplay: true,
       });
     });

     $(document).ready(function () {
        //  slider for brand
        $(".brand").slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          autoplay: true,
        });
     });
  }
}
let x = window.matchMedia("(max-width: 576px)");
mobailMedia(x);

// Tablet
function tabletMedia(x) {
  if (x.matches) { // If media query matches
    // slider
    $(document).ready(function () {
      // slider for testimonial
      $(".testimonials-flex").slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
      });
    });
  }
}
x = window.matchMedia("(max-width: 767px)");
tabletMedia(x);

// For desktop
function desktopMedia(x){
  if (x.matches) { // If media query matches
    $(document).ready(function () {
      // slider for testimonial
      $(".testimonials-flex").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
      });
   });
  }
} //   DesktopMedia function close
x = window.matchMedia("(max-width: 1600px)");
desktopMedia(x);


//  Dropdown menu

function dropDownMedia(x) {
  if (x.matches) { // If media query matches
    const dropMenu = document.querySelector(".drop-down-menu p");
    const dropMenuContent = document.querySelector(".dropdown-content");
    let down = false;
    // click Event handling function on dropdown
    dropMenu.addEventListener("click", function () {
      if (!down) {
        dropMenuContent.style.display = "block";
      } else {
        dropMenuContent.style.display = "none";
      }
      down = !down;
    })
  }
}

// x = window.matchMedia("(max-width: 991.98px)");
x = window.matchMedia("(min-width: 0px)");
dropDownMedia(x);