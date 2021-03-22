import { useState } from "react";
import api from "src/utils/api/api.js";
import "src/styles/components/modal/add-photo.scss";

import InputDragNDrop from "src/components/inputs/input-dragndrop.jsx";
import InputButton from "src/components/inputs/input-button.jsx";
import { PlusIcon } from "src/components/icon.jsx";
import { CSSTransition } from "react-transition-group";

import { useDispatch } from "react-redux";
import { setCategory } from "src/state/gallerySlice.js";

function ModalAddCategory({ close }) {
   const dispatch = useDispatch();

   const [error, setError] = useState("");
   const [showError, setShowError] = useState(false);

   const onSubmit = async (e) => {
      e.preventDefault();

      const addedCategory = await api.post("/gallery", {
         name: nameTrimmed
      });

      switch (addedCategory.response.status) {
         case 201:
            close();
            break;
      }
   }

   return (
      <form className="modal-add-photo" onSubmit={onSubmit}>
         <InputDragNDrop
            accept=".jpg,.jpeg"
            multiple
            onFiles={files => console.log(files)}
         />
         <InputButton value="Pridať" onClick={onSubmit} Icon={<PlusIcon />} />
         <CSSTransition
            in={showError}
            timeout={400}
            onEnter={el => el.style.maxHeight = "0px"}
            onEntering={el => el.style.maxHeight = el.scrollHeight + "px"}
            onExit={el => el.style.maxHeight = el.scrollHeight + "px"}
            onExiting={el => el.style.maxHeight = "0px"}
            unmountOnExit
         >
            <div className="input-error-container">
               <div className="input-error">{error}</div>
            </div>
         </CSSTransition>
      </form>
   )
}

export default ModalAddCategory;
