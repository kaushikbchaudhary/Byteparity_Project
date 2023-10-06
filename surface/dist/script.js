'use strict!';

const tabContainer = document.querySelector(".tabs");
const integrationSection = document.querySelector(".integrations");
const tabContentSiblings = document.querySelector(".tab__content").parentElement.children;
// console.log(tabContentSiblings.);

// console.log(integrationSection.children);
// console.log(integrationSection.childNodes);

const siblingAnchors = document.querySelectorAll('.tabs ul li a');
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

const case_about = function () {
    const allCase = document.querySelectorAll(".case_about");
    let max = 0;
    allCase.forEach(caseHeight => {
        const paragraphHeight = caseHeight.getBoundingClientRect().height;
        (paragraphHeight > max) && (max = paragraphHeight);
    });
    allCase.forEach(caseAbout => {
        caseAbout.style.height = `${max}px`;
    });
};
case_about();