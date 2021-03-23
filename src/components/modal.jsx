import { useLayoutEffect, useState, useEffect, useRef, Fragment, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import "src/styles/components/modal.scss";

import FocusTrap from "focus-trap-react";
import { CloseIcon } from "src/components/icon.jsx";
import ModalAddCategory from "src/components/modal/add-category.jsx";
import ModalAddPhoto from "src/components/modal/add-photo.jsx";
import ModalPhoto from "src/components/modal/photo.jsx";

import getScrollbarWidth from "src/utils/get-scrollbar-width.js";

const ModalContext = createContext();

function ModalProvider({ children }) {
   const modalContainerRef = useRef();
   const [modalContainer, setModalContainer] = useState();

   useEffect(() => {
      setModalContainer(modalContainerRef.current);
   }, []);

   return (
      <Fragment>
         <ModalContext.Provider value={modalContainer}>{children}</ModalContext.Provider>
         <div className="modal-container" ref={modalContainerRef} />
      </Fragment>
   );
}

function Modal({ children, onClose, initialFocus }) {
   const modalContainerRef = useContext(ModalContext);

   useLayoutEffect(() => {
      if (document.body.scrollHeight > window.innerHeight) {
         document.body.style.paddingRight = getScrollbarWidth() + "px";
      }
      document.body.classList.add("--modal-active");
      modalContainerRef.style.top = window.pageYOffset + "px";

      const keyDownHandler = (e) => {
         if (e.code == "Escape")
            onClose();
      };

      window.addEventListener("keydown", keyDownHandler);
      return () => {
         document.body.classList.remove("--modal-active");
         document.body.style.paddingRight = "";
         window.removeEventListener("keydown", keyDownHandler);
      };
   }, []);

   const onBackgroundClick = (e) => {
      if (e.target.classList.contains("modal-background") || e.target.classList.contains("modal-window"))
         onClose();
   }

   if (!modalContainerRef)
      return "";

   return createPortal(
      <div className="modal-background" onClick={onBackgroundClick} onMouseDown={onBackgroundClick}>
         <FocusTrap focusTrapOptions={{initialFocus, fallbackFocus: ".modal > h1 + *"}}>
            <div className="modal-window">
               <button className="modal-window-close" type="button" onClick={onClose}>
                  <CloseIcon />
                  Zavrieť
               </button>
               { children }
            </div>
         </FocusTrap>
      </div>
   , modalContainerRef);
}

function ModalTemplate({ title, children }) {
   return (
      <div className="modal-template">
         <h1 className="modal-template-title">{title}</h1>
         { children }
      </div>
   );
}

export default Modal

export {
   ModalProvider,
   Modal,
   ModalTemplate
}
