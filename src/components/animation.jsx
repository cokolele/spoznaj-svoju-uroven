import { CSSTransition } from "react-transition-group";

function SlideDown({ children, show, duration, unmountOnExit, mountOnEnter, appear }) {
   return (
      <CSSTransition
         in={show}
         timeout={duration}
         onEnter={el => {
            el.style.overflow = "hidden";
            el.style.maxHeight = "0px"
         }}
         onEntering={el => {
            el.style.maxHeight = el.scrollHeight + "px"
         }}
         onExit={el => {
            el.style.maxHeight = el.scrollHeight + "px"
         }}
         onExiting={el => {
            el.style.maxHeight = "0px"
         }}
         appear={appear}
         mountOnEnter={mountOnEnter}
         unmountOnExit={unmountOnExit}
      >
         { children }
      </CSSTransition>
   )
}

export {
   SlideDown
};
