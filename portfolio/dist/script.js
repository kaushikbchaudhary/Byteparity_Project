'use strict!'

const tabs = document.querySelectorAll('.nav-tab');
const navbar = document.querySelector('.nav');
const sections = document.querySelectorAll('.section');

const activeTab = function (enteries, observer) {
    enteries.forEach(entry => {
        if (!entry.isIntersecting) return;
        console.log(entry.target);
        // console.log(enteries.indexOf(entry.target));
        const index = Array.from(sections).indexOf(entry.target);
        tabs.forEach(tab => tab.classList.remove('active'));
        tabs[index].classList.add('active');
        // console.log(enteries);
    });
}
const sectionObserver = new IntersectionObserver(activeTab, {
    root: null,
    threshold: 0,
    threshold:0.5,
});

const tabArry = Array.from(tabs);

sections.forEach(section => sectionObserver.observe(section));
navbar.addEventListener('click', function (e) {
    if (e.target.classList.contains('nav-tab')) {
        // tabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active')
        const index = tabArry.indexOf(e.target);
        sections[index].scrollIntoView({ behavior: 'smooth'});

    }
});
