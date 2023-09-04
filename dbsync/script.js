
let menuBtn = false;
document.querySelector(".hamburger-menu").addEventListener('click',function (){
    if(menuBtn){
        document.querySelector(".navbar_nav").style.display = "none";
    }else {
        document.querySelector(".navbar_nav").style.display = "flex";
    }
    menuBtn = !menuBtn;
})
//
// // Create a media condition that targets viewports at least 768px wide
// const mediaQuery = window.matchMedia('(max-width: 575.98px)')
// // Check if the media query is true
// if (mediaQuery.matches) {
//     // Then trigger an alert
//     // alert('Media Query Matched!')
//
//
// }


// Create a media condition that targets viewports at least 768px wide
// Check if the media query is true
// if (mediaQuery.matches) {
//     // Then trigger an alert
//     alert('Media Query Matched!')
// }

let mediaQuery = window.matchMedia('(max-width: 575.98px)')


const tabContent = document.querySelector('.tab-content');



function handleTabletChange(e) {
    // Check if the media query is true
    if (e.matches) {
        // Then log the following message to the console
        $(document).ready(function() {
        $('.tab-content').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            arrows:true,
        });
            // $('.our_products').slick({
            //     infinite: true,
            //     slidesToShow: 1,
            //     slidesToScroll: 1,
            //     autoplay: false,
            //     autoplaySpeed: 2000,
            //     arrows:true,
            // });
            $('.our_products').slick({
                dots: true,
                infinite: true,
                speed: 500,
                fade: true,
                arrows:false,
                cssEase: 'linear'
            });
            $('.client-cards').slick({
                dots: true,
                infinite: true,
                speed: 500,
                fade: true,
                arrows:false,
                cssEase: 'linear'
            });
    });
    }else {
        $(document).ready(function() {
            $('.tab-content').slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows:true,
                dots:false,
            });
        });
    }
}

// Register event listener
mediaQuery.addListener(handleTabletChange)

// Initial check
handleTabletChange(mediaQuery)