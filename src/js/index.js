// Bootstrap
import '../../node_modules/bootstrap';

// CSS
import "../scss/style.scss";

import gsap from "gsap";
import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
barba.use(barbaPrefetch);
//import barbaCss from '@barba/css';
//barba.use(barbaCss);

// --- initialize ---

window.addEventListener("DOMContentLoaded", init);

function init(){
  navSetup();
  barbaInit();
}

// --- *********** ---

function navSetup(){

  const navbarHeight = document.querySelector(".navbar").offsetHeight;

  console.log(navbarHeight)

  document.querySelector("main").style.marginTop = navbarHeight + "px";
}

const barbaInit = () => {
				
      barba.init({

        // Options

        preventRunning: true,

      // Transitions

      transitions: [{

        name: 'slide',
        sync: true,
  
        leave: (data) => {

          return gsap.to(data.current.container, {
            duration: .5,
            x: "-100vw",
            ease: "power1.out",
            opacity: 0
          })
        },
  
        enter: (data) => {

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
            onComplete:function(){
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
        
      }],
    });
  }

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 4);
    }
  };