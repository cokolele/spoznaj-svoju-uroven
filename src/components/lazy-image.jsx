import { useEffect, useState } from "react";
import "src/styles/components/lazy-image.scss";

import { CSSTransition } from "react-transition-group";
import { loadImage } from "src/utils/image.js";

//const whitePixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg==";

function LazyImage({ placeholder, full, background, duration = 300 }) {
   const [from, setFrom] = useState("");
   const [to, setTo] = useState("");
   const [buffer, setBuffer] = useState(placeholder ? placeholder : "");

   useEffect(() => {
      let canceled = false;
      let canceler = {};

      if (full) {
         loadImage(full, canceler)
            .then(loadedUrl => {
               if (!canceled)
                  setBuffer(loadedUrl);
            })
            .catch(e => console.error(full, e));
      }

      return () => {
         if (canceler.cancel)
            canceler.cancel();
         canceled = true;
      }
   }, [full]);

   useEffect(() => {
      if (!to && buffer != from)
         setTo(buffer);
   }, [buffer, to]);

   return (
         <div className="lazy-image-container">
            {
               from && ( background ? (
                  <div style={{backgroundImage: `url(${from})`}} className="lazy-image"></div>
               ) : (
                  <img src={from} className="lazy-image"/>
               ))
            }
            <CSSTransition
               classNames="lazy-image-transition"
               in={!!to}
               timeout={{ enter: duration }}
               onEnter={el => el.style.opacity = 0}
               onEntering={el => {el.style.transition = `opacity ${duration}ms ease`; el.style.opacity = 0.99;}}
               onEntered={el => {
                  //must re-render incase that the buffer supplies next value immediately then opacity 0 doesnt trigger
                  el.style.display = "none";
                  el.offsetHeight;
                  el.style.display = "block";
                  setFrom(to);
                  setTo("");
               }}
               mountOnEnter
               unmountOnExit
            >
               {
                  background ? (
                     <div style={{backgroundImage: `url(${to})`}} className="lazy-image"></div>
                  ) : (
                     <img src={to} className="lazy-image"/>
                  )
               }
            </CSSTransition>
         </div>
   )
}

export default LazyImage;
