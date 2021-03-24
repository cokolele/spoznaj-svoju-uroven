import { useState } from "react";
import api from "src/utils/api/api.js";
import "src/styles/components/card.scss";

import { Link } from "react-router-dom";
import { SlideDown } from "src/components/animation.jsx";

function Card({ linkTo, id, name, description, onClick, onMouseEnter, actionName, actionIcon, backgroundUrl, Image, href, ref }) {
   const [showDescription, setShowDescription] = useState(false);

   const _onMouseEnter = (e) => {
      if (onMouseEnter)
         onMouseEnter(e, id);

      setShowDescription(true);
   }

   const _onMouseLeave = (e) => {
      setShowDescription(false);
   }

   const _onClick = (e) => {
      if (onClick)
         onClick(e, id);
   }

   let ContentWrapper = "div";
   if (linkTo)
      ContentWrapper = Link;
   if (href)
      ContentWrapper = "a";

   return (
      <div className="card-container">
         <ContentWrapper
            className="card-wrapper"
            to={linkTo}
            onMouseEnter={_onMouseEnter}
            onMouseLeave={_onMouseLeave}
            onClick={_onClick}
            href={href}
         >
            <div className={`card ${(actionName || actionIcon) ? "--action" : ""}`} ref={ref}>
               {
                  backgroundUrl && <div className="card-image" style={{backgroundImage: `url(${backgroundUrl})`}}></div>
               }
               {
                  Image && <div className="card-image">{Image}</div>
               }
               {
                  (name || description) &&
                  <div className="card-details">
                     <div className="card-name">{name}</div>
                     <SlideDown
                        show={showDescription}
                        duration={200}
                     >
                        <div className="card-description">{description}</div>
                     </SlideDown>
                  </div>
               }
               {
                  (actionName || actionIcon) &&
                  <div className="card-action">
                     <div className="card-action-icon">{actionIcon}</div>
                     <div className="card-action-name">{actionName}</div>
                  </div>
               }
            </div>
         </ContentWrapper>
      </div>
   )
}

export default Card;
