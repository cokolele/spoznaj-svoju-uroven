import { useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "src/state/appSlice.js";
import "src/styles/components/modal.scss";

import getScrollbarWidth from "src/utils/get-scrollbar-width.js";
import { CloseIcon } from "src/components/icon.jsx";

import ModalAddCategory from "src/components/modal/add-category.jsx";
import ModalAddPhoto from "src/components/modal/add-photo.jsx";

const Views = {
   addCategory: {
      title: "Pridať kategóriu",
      View: ModalAddCategory
   },
   addPhoto: {
      title: "Pridať fotky",
      View: ModalAddPhoto
   }
};

function ModalManager() {
   const modal = useSelector(state => state.app.modal);

   if (!modal || !Views[modal].View)
      return "";

   return (
      modal && Views[modal].View && <Modal {...Views[modal]} />
   )
}

function Modal({ View, title }) {
   const dispatch = useDispatch();
   const wrapper = useRef(null);

   const onClose = () => {
      dispatch(closeModal());
   }

   const onModalMouseDown = (e) => {
      if (e.target.classList.contains("modal-background"))
         onClose();
   }

   useLayoutEffect(() => {
      const body = document.body;
      const root = document.getElementById("app");

      wrapper.current.style.top = window.pageYOffset + "px";
      body.style.paddingRight = getScrollbarWidth() + "px";
      body.classList.add("--modal-active");

      const keyDownHandler = (e) => {
         if (e.code == "Escape")
            onClose();
      };

      window.addEventListener("keydown", keyDownHandler);
      return () => {
         body.classList.remove("--modal-active");
         body.style.paddingRight = "";
         window.removeEventListener("keydown", keyDownHandler);
      };
   }, []);

   return (
      <div className="modal-background" onMouseDown={onModalMouseDown} ref={wrapper}>
         <div className="modal-container">
            <button className="modal-close" type="button" onClick={onClose}>
               <CloseIcon />
               Zavrieť
            </button>
            <div className="modal">
               <h1 className="modal-title">{title}</h1>
               <View close={onClose} />
            </div>
         </div>
      </div>
   );
}

export default ModalManager;
