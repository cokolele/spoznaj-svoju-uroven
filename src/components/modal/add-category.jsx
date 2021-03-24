import { useState } from "react";
import api from "src/utils/api/api.js";
import "src/styles/components/modal/add-category.scss";

import { Modal, ModalTemplate } from "src/components/modal.jsx";
import InputRow from "src/components/inputs/row.jsx";
import InputButton from "src/components/inputs/input-button.jsx";
import InputText from "src/components/inputs/input-text.jsx";
import { PlusIcon } from "src/components/icon.jsx";
import { SlideDown } from "src/components/animation.jsx";

function ModalAddCategory({ onClose, onAdded }) {
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
            onClose();
            onAdded();
            break;
      }
   }

   return (
      <Modal initialFocus="input" onClose={onClose}>
         <ModalTemplate title="Pridať kategóriu">
            <form className="modal-add-category" onSubmit={onSubmit}>
               <InputRow>
                  <InputText name="name" placeholder="Zadajte názov kategórie" value={name} onChange={onChange} required />
                  <InputButton value="Pridať" onClick={onSubmit} Icon={<PlusIcon />} />
               </InputRow>
               <SlideDown
                  show={showError}
                  duration={400}
                  unmountOnExit
               >
                  <div className="modal-add-category-error">{error}</div>
               </SlideDown>
            </form>
         </ModalTemplate>
      </Modal>
   )
}

export default ModalAddCategory;
