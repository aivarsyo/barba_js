// Bootstrap
import '../../node_modules/bootstrap';

// CSS
import "../scss/style.scss";

import gsap from "gsap";
import barba from '@barba/core';
import barbaCss from '@barba/css';
barba.use(barbaCss);

// --- initialize ---

window.addEventListener("DOMContentLoaded", init);

function init(){
    pageTransition();
}

// --- *********** ---

function pageTransition(){

    barba.init({
      // Options
    
      // Transitions
      transitions: [/* {
        name: 'expand', //Custom name to be used in CSS classes
        sync: true, //Enter and leave happens at the same time when true, one after the other when false (false by default)
        enter: () => {}, //Allows the custom name to show up in these classes (.fade-enter instead of .barba-enter)
        leave: () => {}, //Allows the custom name to show up in these classes (.fade-leave instead of .barba-leave) 
        from: { //Use this transition when going from these pages...
          namespace: [
            'page',
            'page2'
          ]
        },
        to: { //...to these pages (The namespace is given as an attribute to the container in the HTML)
          namespace: [
            'page',
            'page2'
          ]
        },
      }, */
      {
        name: 'slide',
        sync: true,
  
        leave: (data) => {
  gsap.to(data.current.container, {
    duration: 2,
    x: "100%"
  })
        },
  
        enter: (data) => {
  
  gsap.set(data.next.container, {
    x: "-100%"
  })
  
  gsap.to(data.next.container, {
    duration: 2,
    x: 0
  })
        },
        
      }/* ,
      {
        name: 'slide-reverse',
        sync: true,
        to: {
          namespace: [
            'home'
          ]
        },
        leave: () => {},
        enter: () => {}
        //Adding these empty hooks lets the CSS classes use the transition name (slide-reverse-leave, slide-reverse-leave-active, slide-reverse-leave-to, etc.)
      } */],
    
      // Views
      // views: [{
      //   namespace: 'home',
      //   beforeLeave(data) {
      //     data.current.container.children[0].style.fontSize = "2em";
      //   }
      // }]
    });
  }