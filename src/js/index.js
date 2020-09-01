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

  barba.hooks.enter(() => {
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
            //opacity: 0
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

          tml.to(data.next.container, {
            opacity: 1

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
          scrollToTopFast();
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

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 4);
  }
};

function scrollToTopFast() {

  window.scrollTo(0, 0);
}

/* --- ************************* --- */


/*  --- focus the page which is clicked at the navigation --- */

function focusNav() {

  const url = window.location.pathname;

  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function () {
      document.querySelectorAll(".nav-link").forEach(navLink => {
        if (navLink.href == this) {
          document.querySelectorAll(".nav-link").forEach(item => {
            item.classList.remove("active");
          })
          navLink.classList.add("active");
        }
      })
    })

  })
}

/* --- ************************* --- */