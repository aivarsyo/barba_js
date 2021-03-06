// Bootstrap
import '../../node_modules/bootstrap';

// CSS
import "../scss/style.scss";

import gsap from "gsap";
import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
barba.use(barbaPrefetch);

// --- initialize ---

window.addEventListener("DOMContentLoaded", init);

function init() {
  focusNav();
  barbaInit();
}

// --- *********** ---

const barbaInit = () => {

  // Global hooks

  barba.hooks.after(() => {
    focusNav();
  });

  barba.init({

    // Options

    preventRunning: true,

    // Transitions

    transitions: [{

        name: 'slide',
        sync: true,

        leave: (data) => {
          pageTransitionLeave(data);
        },

        enter: (data) => {
          //pageTransitionEnter(data);

          const tml = gsap.timeline();

          tml.set(data.next.container, {
            y: -data.current.container.offsetHeight,
          })

          tml.from(data.next.container, {
            duration: .5,
            x: "100vw",
            ease: "power1.out",
            opacity: 0,
            onComplete: function () {
              scrollToTop();
            }
          })

          tml.set(data.next.container, {
            y: 0
          })

          return tml;
        },

        once: () => {
          contentAnimation();
        },

      },

      /* --- animation to home --- */

      {
        name: 'overlay',
        to: {
          namespace: [
            'home'
          ]
        },

        async leave(data) {
          const done = this.async();

          pageTransition(data);
          await delay(300);
          scrollToTop();
          done();
        },

        async enter(data) {
          contentAnimation();
        },

        async once() {
          contentAnimation();
        },
      },
    ],
  });
}

/* --- **************************** --- */

function pageTransitionLeave(data) {

  gsap.to(data.current.container, {
    duration: .5,
    x: "-100vw",
    ease: "power1.out",
    opacity: 0
  })
}

/* function pageTransitionEnter(data){

  

} */

function pageTransition(data) {
  const tl = gsap.timeline();

  tl.to(".load__container__screen", {
    duration: .5,
    width: "100%",
    left: "0%",
    ease: "Expo.easeInOut",
  });

  tl.to(".load__container__screen", {
    duration: .5,
    width: "100%",
    left: "100%",
    ease: "Expo.easeInOut",
    delay: 0.3,
  });
  tl.set(".load__container__screen", {
    left: "-100%"
  });
}

function contentAnimation() {
  const tl = gsap.timeline();
  tl.from(".animate-this", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.4,
    delay: 0.2,
  });
}

/* --- ************************* --- */


/* --- delay function --- */

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

/* --- ********************* --- */


/* --- scroll to top after changing a page --- */

function scrollToTop() {

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

/* --- ************************* --- */


/*  --- focus the page which is clicked at the navigation --- */

function focusNav() {

  const currentUrl = window.location.href;

  const navbar = document.querySelector(".navbar");

  const main = document.querySelector("main");

  main.style.marginTop = navbar.offsetHeight + "px";


  document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function (e) {

      document.querySelectorAll(".nav-link").forEach(navLink => {

        if (navLink.href == this.href) {
          console.log(navLink.href)
          console.log(this.href)
          document.querySelectorAll(".nav-link").forEach(item => {
            item.classList.remove("active");
          })
          navLink.classList.add("active");
          e.preventDefault();
          console.log(this)
        } else {
          scrollToTop();
        }


      })
    })

  })
}

/* --- ************************* --- */