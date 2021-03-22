import { useState } from "react";
import api from "src/utils/api/api.js";
import "src/styles/components/modal/add-category.scss";

import InputRow from "src/components/inputs/row.jsx";
import InputButton from "src/components/inputs/input-button.jsx";
import InputText from "src/components/inputs/input-text.jsx";
import { PlusIcon } from "src/components/icon.jsx";
import { CSSTransition } from "react-transition-group";

import { useDispatch } from "react-redux";
import { addCategory } from "src/state/gallerySlice.js";

function ModalAddCategory({ close }) {
   const dispatch = useDispatch();

   const [name, setName] = useState("");
   const [error, setError] = useState("");
   const [showError, setShowError] = useState(false);

   const onChange = (text) => {
      if (error)
         setShowError(false);

      setName(text);
   }

   const onSubmit = async (e) => {
      e.preventDefault();

      const nameTrimmed = name.trim();
      if (!nameTrimmed) {
         setError("Zadajte názov.");
         setShowError(true);
         return;
      }

      const addedCategory = await api.post("/gallery", {
         name: nameTrimmed
      });

      switch (addedCategory.response.status) {
         case 400:
            setError("Neplatný názov.");
            setShowError(true);
            break;
         case 409:
            setError("Názov už existuje.");
            setShowError(true);
            break;
         case 500:
         case -1:
            setError("Neočakávaný error. Skúste neskôr prosím.");
            setShowError(true);
            break;

         case 201:
            dispatch(addCategory({
               ...addedCategory.json,
               images: []
            }))
            close();
            break;
      }
   }

   return (
      <form className="modal-add-category" onSubmit={onSubmit}>
         <InputRow>
            <InputText name="name" placeholder="Zadajte názov kategórie" value={name} onChange={onChange} required />
            <InputButton value="Pridať" onClick={onSubmit} Icon={<PlusIcon />} />
         </InputRow>
         <CSSTransition
            in={showError}
            timeout={400}
            onEnter={el => el.style.maxHeight = "0px"}
            onEntering={el => el.style.maxHeight = el.scrollHeight + "px"}
            onExit={el => el.style.maxHeight = el.scrollHeight + "px"}
            onExiting={el => el.style.maxHeight = "0px"}
            unmountOnExit
         >
            <div className="modal-add-category-error">{error}</div>
         </CSSTransition>
      </form>
   )
}

export default ModalAddCategory;
