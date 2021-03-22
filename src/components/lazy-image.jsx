import { useEffect, useState } from "react";
import "src/styles/components/lazy-image.scss";

import { CSSTransition } from "react-transition-group";
import { loadImage, loadFileImage } from "src/utils/image.js";

//trošku mess sry
function LazyImage({ placeholder, full, file, background, className, duration = 300, style }) {
   const [from, setFrom] = useState("");
   const [to, setTo] = useState("");
   const [buffer, setBuffer] = useState("");

   useEffect(() => {
      if (file) {
         loadFileImage(file)
            .then(loadedUrl => {
               setBuffer(loadedUrl);
            });
      }

      if (!from && !to) { //init

         if (placeholder) {
            loadImage(placeholder)
               .then(loadedUrl => {
                  if (!buffer)
                     setBuffer(loadedUrl);
               })
               .catch(e => console.error(e));
         }

         if (full) {
            loadImage(full)
               .then(loadedUrl => {
                  if (!buffer || buffer == placeholder)
                     setBuffer(loadedUrl);
               })
               .catch(e => console.error(e));
         }

      } else if (full) { //full image changed

         loadImage(full)
            .then(loadedUrl => {
               setBuffer(loadedUrl);
            })
            .catch(e => console.error(e));

      }
   }, [full, file]);

   useEffect(() => {
      if (!to && buffer && (buffer == placeholder || buffer == full || file) && buffer != from)
         setTo(buffer);
   }, [buffer, to]);

   return (
         <div className={`${className ? className : "lazy-image-container"}`}>
            {
               from && ( background ? (
                  <div style={{...style, backgroundImage: `url(${from})`}} className="lazy-image"></div>
               ) : (
                  <img src={from} style={style} className="lazy-image"/>
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
                     <div style={{...style, backgroundImage: `url(${to})`}} className="lazy-image"></div>
                  ) : (
                     <img src={to} style={style} className="lazy-image"/>
                  )
               }
            </CSSTransition>
         </div>
   )
}

export default LazyImage;
