import { useEffect, useState } from "react";
import "src/styles/components/lazy-image.scss";

import { CSSTransition } from "react-transition-group";
import { loadImage } from "src/utils/image.js";

function LazyImage({ placeholder, full, background, className, duration = 300 }) {
   const [from, setFrom] = useState("");
   const [to, setTo] = useState("");
   const [buffer, setBuffer] = useState("");

   useEffect(() => {
      if (placeholder) {
         loadImage(placeholder)
            .then(loadedUrl => {
               if (!from && !to)
                  setBuffer(loadedUrl);
            })
            .catch(e => console.error(placeholder, e));
      }
   }, []);

   useEffect(() => {
      if (full) {
         loadImage(full)
            .then(loadedUrl => {
               setBuffer(loadedUrl);
            })
            .catch(e => console.error(full, e));
      }
   }, [full]);

   useEffect(() => {
      if (!to && buffer && buffer != from)
         setTo(buffer);
   }, [buffer, to]);

   return (
         <div className={`${className ? className : "lazy-image-container"}`}>
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
               onEntering={el => {el.style.transition = `opacity ${duration}ms ease`; el.style.opacity = 1;}}
               onEntered={el => {
                  setFrom(to);
                  el.style.display = "none";
                  el.offsetHeight;
                  el.style.display = "block";
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
