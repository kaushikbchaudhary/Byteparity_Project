// const tabContent = document.querySelector('.tab-content');
$(document).ready(function() {
    $('.tab-content').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows:true,
    });
});