'use strict!';

const tabContainer = document.querySelector(".tabs");
const integrationSection = document.querySelector(".integrations");
const tabContentSiblings = document.querySelector(".tab__content").parentElement.children;
// console.log(tabContentSiblings.);

// console.log(integrationSection.children);
// console.log(integrationSection.childNodes);

const siblingAnchors = integrationSection.querySelectorAll('.tabs ul li a');
console.log(siblingAnchors);
tabContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        console.log(e.target.dataset.tab);
        const tabClicked = e.target.dataset.tab;
       
        // const siblingAnchors = Array.from(e.target.parentElement.parentElement.children).map(li => li.querySelector('a'));
        // console.log(siblingAnchors);
        // siblingAnchors.forEach(a => {
        //     console.log(a);
        //     a.classList.remove('activeTab');
        // });
        
        siblingAnchors.forEach(anchor => anchor.classList.remove('activeTab'));
        e.target.classList.add('activeTab');
        console.log(e.target.classList);
        document.querySelectorAll('.tab__content').forEach(tab => tab.classList.remove('activeTabContent'));
        document.querySelector(`.${tabClicked}`).classList.add('activeTabContent');

    };
});

// const case_about = function () {
//     const allCase = document.querySelectorAll(".case_about");
//     let max = 0;
//     allCase.forEach(caseHeight => {
//         const paragraphHeight = caseHeight.getBoundingClientRect().height;
//         (paragraphHeight > max) && (max = paragraphHeight);
//     });
//     allCase.forEach(caseAbout => {
//         caseAbout.style.height = `${max}px`;
//     });
// };
// case_about();

const sections = document.querySelectorAll('.nav_section');
const tabs = document.querySelectorAll('.tab');
const navigation = document.querySelector('.navigation');
// sticky
const stickyNav = function (enteries, observer) {
    enteries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.isIntersecting) {
            tabs.forEach(tab => tab.classList.remove('active'));
            navigation.classList.add("sticky");
            const index = Array.from(sections).indexOf(entry.target);
            tabs[index].classList.add('active');
            tabs[index].classList.contains('active') && tabs[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });         
            console.log(entry.isIntersecting, entry.target);
        }
    });
};
const currentSection = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0.20,
});

sections.forEach(section => {
    currentSection.observe(section);
});

$(document).ready(function () {
    $("#case-study-owl").owlCarousel({
        responsive: true,
        items : 2,
        itemsDesktop : [1199,2],
        itemsDesktopSmall : [980,2],
        itemsTablet: [768,1],
        itemsMobile : [479,1],
        loop: true, // Infinite loop
        autoplay: true, // Autoplay the slider
        autoplayTimeout: 3000, // Autoplay interval in milliseconds
        autoplayHoverPause: true // Pause autoplay when mouse is over the slider
    });

    $("#our-customers-owl").owlCarousel({
        responsive: true,
        items: 2,
        itemsDesktop : [1199,2],
        itemsDesktopSmall : [980,2],
        itemsTablet: [768,1],
        itemsMobile : [479,1],
        loop: true, // Infinite loop
        autoplay: true, // Autoplay the slider
        autoplayTimeout: 3000, // Autoplay interval in milliseconds
        autoplayHoverPause: true // Pause autoplay when mouse is over the slider
    });
});
            
