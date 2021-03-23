import { useEffect, useState } from "react";
import "src/styles/components/modal/photo.scss";

import Modal from "src/components/modal.jsx";
import { ArrowHeadRightIcon } from "src/components/icon.jsx";
import Loader from "src/components/loader.jsx";

import { loadImage } from "src/utils/image.js";

function ModalPhoto({ onClose, image, onNext, onPrevious }) {
   const [src, setSrc] = useState("");

   useEffect(() => {
      let canceled = false,
         canceler = {};

      setSrc("");
      const promise = loadImage(image, canceler)
         .then(url => {
            if (!canceled)
               setSrc(url);
         }).catch(e => console.error("image load error: ", e));

      return () => {
         canceled = true;
         canceler.cancel();
      }
   }, [image]);

   useEffect(() => {
      const keyDownHandler = (e) => {
         if (e.code == "ArrowRight")
            onNext();
         else if (e.code == "ArrowLeft")
            onPrevious();
      };

      window.addEventListener("keydown", keyDownHandler);
      return () => {
         window.removeEventListener("keydown", keyDownHandler);
      };
   }, [image]); //onNext a onPrevious musia byt stale updatnute, neviem preco, inak to nejde

   return (
      <Modal onClose={onClose}>
         {
            src ? (
               <img src={src} className="modal-photo"/>
            ) : (
               <div className="modal-photo-loader">
                  <Loader/>
               </div>
            )
         }
         <button type="button" className="modal-photo-previous" onClick={onPrevious}><ArrowHeadRightIcon/></button>
         <button type="button" className="modal-photo-next" onClick={onNext}><ArrowHeadRightIcon/></button>
      </Modal>
   )
}

export default ModalPhoto;
