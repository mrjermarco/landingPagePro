// JavaScript code written following Session Lead Rockwell YouTube walk-through

//global variable created to target sections
const sections = document.getElementsByTagName('section');
    
//variable for array that will log out the top of each section when in viewport
let sectionTop = []; 

// function to build array that logs where we are in the window by section
function trackSecLocation() {

// variable created to track when we reach the footer in the page to signify we're out of sections
const footerTop = document.getElementById('footer').getBoundingClientRect().top + window.scrollY;
    for(let i = 0; i < sections.length; i++) {
        let topOfSection = sections[i].getBoundingClientRect().top + window.scrollY;
        sectionTop[i] = topOfSection;

//sets condition to let us know when we've reached the footer after going through sections 
    if (i + 1 == sections.length) {
        sectionTop[i+1] = footerTop;
        }
    }
}

// function created for removing active states of sections and hyperlinks in navbar when clicked
function activeSections() {
    const anchorGrab = document.getElementsByTagName('a'); 
        for(let i = 0; i < sections.length; i++) {
            sections[i].classList.remove('activeState');
            anchorGrab[i].classList.remove('activeSection');
        }
}

// function to create the navigation bar
function createNav() {
    
    // for loop to create the items in the Navigation Bar and which sections they correspond to
    for(let i = 0; i < sections.length; i++) {

        // variable created to reference unordered list
        const navBar = document.getElementById('navbar__list');

        // variables for creating the list items and their corresponding hyperlinks
        const navList = document.createElement('li');
        const listAnchor = document.createElement('a');

        // variable created to access data-nav attribute to match with corresponding section
        const listName = sections[i].getAttribute('data-nav');
        

        // class created to target the individual navBar anchors
        listAnchor.classList.add('secAnchor');
        
        // the innerHTML method here attaches the anchor tags text from the data-nav names to match text in navigation bar
        listAnchor.innerHTML = listName;

        // class created to target the individual navBar sections
        navList.classList.add('secNavItem');

        // adding the href attribute dynamically sets an anchor tag to the targeted anchors and sections
        listAnchor.setAttribute('href', sections[i].id);
        listAnchor.setAttribute('data-id', sections[i].id);
        
        // append method to attach the anchor element to the list element
        navList.append(listAnchor);
        
        // append method used to combine the navList items to the navigation bar or the ul element in the html
        navBar.append(navList);   

        // added event listener to prevent the page from automatically jumping to section
        listAnchor.addEventListener('click', function(event) {
            event.preventDefault();

            // variables created to target id of each section to activate smooth scroll
            const secId = event.target.getAttribute('data-id');
            const sectionScroll = document.getElementById(secId);

                //adds active state to elements clicked in listAnchor element event listener
                activeSections();
                event.target.classList.add('activeSection');
                sectionScroll.classList.add('activeState');

            // scroll into view method targeted to sectionScroll variable to allow a smooth flow to clicked sections
            sectionScroll.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// function to track scrolling and viewport to manage active states
function pageScroll() {
    const location = window.scrollY;
    
    // variable to target the anchor tags and their corresponding section
    const navAnchors = document.getElementsByTagName('a'); 

    for(let i = 0; i < sections.length; i++) {
        
        // variables to let us know where one section begins and the other ends
        const startOfSection = sectionTop[i];
        const endOfSection = sectionTop[i+1];

        // condition to detect our page location
        if(startOfSection <= location && endOfSection > location) {
            activeSections();
            sections[i].classList.add('activeState');
            navAnchors[i].classList.add('activeSection');
        }
    }
}

createNav();
trackSecLocation();
window.addEventListener('scroll', pageScroll);

//function created to call the default action of showing the header containing the navbar 
function showNav () {
    const nav = document.querySelector('header');
    nav.style.visibility = "" 
}

//function created to hide the navbar using the css property visibility
function hideNav () {
    const nav = document.querySelector('header');
    nav.style.visibility = "hidden" 
}

//variable created to track the time that has passed in the window plus 2 seconds 
let scheduledHideTime = Date.now() + 2000;

//created an event listener to track when the user scrolls and show or hide the navbar based upon time passed
window.addEventListener('scroll' , function() { 
    showNav();
    scheduledHideTime = Date.now() + 2000;
    setTimeout(function() {
      if (Date.now() >= scheduledHideTime) { hideNav() } ;
    }, 2000);
})

//added onbeforeunload event to set the window back to the top after reloading the page
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
