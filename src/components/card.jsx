import { useState } from "react";
import api from "src/utils/api/api.js";
import "src/styles/components/card.scss";

import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

function Card({ linkTo, id, name, description, onClick, onMouseEnter, actionName, actionIcon, backgroundUrl, Image }) {
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

   return (
      <div className="card-container">
         <div className={`card ${(actionName || actionIcon) ? "--action" : ""}`}
            onMouseEnter={_onMouseEnter}
            onMouseLeave={_onMouseLeave}
            onClick={_onClick}
         >
            <ContentWrapper to={linkTo} className="card-wrapper">
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
                     <CSSTransition
                        in={showDescription}
                        timeout={0.2}
                        onEnter={el => el.style.maxHeight = "0px"}
                        onEntering={el => el.style.maxHeight = el.scrollHeight + "px"}
                        onExit={el => el.style.maxHeight = el.scrollHeight + "px"}
                        onExiting={el => el.style.maxHeight = "0px"}
                        mountOnEnter
                        unmountOnExit
                     >
                        <div className="card-description">{description}</div>
                     </CSSTransition>
                  </div>
               }
               {
                  (actionName || actionIcon) &&
                  <div className="card-action">
                     <div className="card-action-icon">{actionIcon}</div>
                     <div className="card-action-name">{actionName}</div>
                  </div>
               }
            </ContentWrapper>
         </div>
      </div>
   )
}

export default Card;
