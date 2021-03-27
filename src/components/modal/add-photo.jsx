import { useState } from "react";
import api from "src/utils/api/api.js";
import "src/styles/components/modal/add-photo.scss";

import { Modal, ModalTemplate } from "src/components/modal.jsx";
import InputDragNDrop from "src/components/inputs/input-dragndrop.jsx";
import InputButton from "src/components/inputs/input-button.jsx";
import { PlusIcon } from "src/components/icon.jsx";
import { SlideDown } from "src/components/animation.jsx";

function ModalAddPhoto({ onClose, onAdded, category }) {
   const [files, setFiles] = useState([]);
   const [error, setError] = useState("");
   const [showError, setShowError] = useState(false);
   const [loading, setLoading] = useState(false);

   const onFiles = (files) => {
      setFiles(files)
      setShowError(false);
   }

   const removeFile = (index) => {
      setFiles(files.filter((file, i) => index != i));
   }

   const onSubmit = async (e) => {
      e.preventDefault();

      if (!files.length) {
         setError("Vyberte fotky.");
         setShowError(true);
         return;
      }

      let errorCheck = false;

      files.forEach(file => {
         const fileName = file.name.length < 30 ? file.name : (file.name.slice(0, 30) + "...");

         if (file.size > 30*1024*1024) {
            errorCheck = true;
            setError("Veľkost fotky " + fileName + " je väčšia ako 30 MB.");
            setShowError(true);
         } else if (!file.name.match(/\.(jpg|jpeg)$/i)) {
            errorCheck = true;
            setError("Fotka " + fileName + " nie je vo formáte JPEG.");
            setShowError(true);
         }
         /*
          * additional file content checks (magic number...)
          */
      });

      if (errorCheck)
         return;

      let uploadErrors = "";

      await Promise.all(files.map(async (file, i) => {
         const fileName = file.name.length < 30 ? file.name : (file.name.slice(0, 30) + "...");
         const fileData = new FormData();
         fileData.append("image", file);

         const uploaded = await api.post("/gallery/" + category, fileData, false);

         switch (uploaded.response.status) {
            case 201:
               removeFile(i);
               break;

            case 500:
            case 400:
            case -1:
               uploadErrors += "Nahrávanie súboru " + fileName + " zlyhalo.\n";
               break;
            case 404:
               uploadErrors = "Kategóriu sa nepodarilo nájsť.\n";
               break;
         }
      }));

      onAdded();

      if (uploadErrors) {
         setError(uploadErrors);
         setShowError(true);
         return;
      }

      onClose();
   }

   return (
      <Modal initialFocus="label" onClose={onClose}>
         <ModalTemplate title="Pridať fotky">
            <form className="modal-add-photo" onSubmit={onSubmit}>
               <InputDragNDrop
                  accept=".jpg,.jpeg"
                  multiple
                  onFiles={onFiles}
                  editable={!loading}
               />
               <InputButton value="Pridať" onClick={onSubmit} Icon={<PlusIcon />} loading={loading} />
               <SlideDown
                  show={showError}
                  duration={400}
                  unmountOnExit
               >
                  <div className="modal-add-photo-error">{error}</div>
               </SlideDown>
            </form>
         </ModalTemplate>
      </Modal>
   )
}

export default ModalAddPhoto;
