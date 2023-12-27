'use strict!';

const tabs = document.querySelectorAll('.nav-tab');
const navbar = document.querySelector('.nav');
const sections = document.querySelectorAll('.section');

// active tab showing
const activeTab = function (enteries, observer) {
  enteries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    console.log(entry.target);
    const index = Array.from(sections).indexOf(entry.target);
    tabs.forEach((tab) => tab.classList.remove('active'));
    tabs[index].classList.add('active');
  });
};

const sectionObserver = new IntersectionObserver(activeTab, {
  root: null,
  threshold: 0,
  threshold: 0.5,
});

const tabArry = Array.from(tabs);

sections.forEach((section) => sectionObserver.observe(section));

navbar.addEventListener('click', function (e) {
  // if it not the targeteed element
  if (!e.target.classList.contains('nav-tab')) return;

  // tabs.forEach(tab => tab.classList.remove('active'));
  if (e.target.classList.contains('active')) return;
  tabs.forEach((tab) => tab.classList.remove('active'));
  e.target.classList.add('active');
  const index = tabArry.indexOf(e.target);
  sections[index].scrollIntoView({ behavior: 'smooth' });
});

const dots = document.querySelectorAll('.dots');
const cards = document.querySelectorAll('.card');

function myFunction(x) {
  cards.forEach((card) => {
    card.onmouseenter = function (e) {
      if (!e.target.querySelector('.more')) return;
      e.target.querySelector('.dot').style.display = 'none';
      e.target.querySelector('.more').style.display = 'inline';
    };
    card.onmouseleave = function (e) {
      if (!e.target.querySelector('.more')) return;
      e.target.querySelector('.more').style.display = 'none';
      e.target.querySelector('.dot').style.display = 'block';
    };
  });
}

let x = window.matchMedia('(min-width: 991.68px)');
myFunction(x);
x.addListener(myFunction);
