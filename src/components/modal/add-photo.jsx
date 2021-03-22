import { useState } from "react";
import api from "src/utils/api/api.js";
import "src/styles/components/modal/add-photo.scss";

import InputDragNDrop from "src/components/inputs/input-dragndrop.jsx";
import InputButton from "src/components/inputs/input-button.jsx";
import { PlusIcon } from "src/components/icon.jsx";
import { CSSTransition } from "react-transition-group";

import { useDispatch } from "react-redux";
import { setCategory } from "src/state/gallerySlice.js";

function ModalAddCategory({ close, modalSpecificProps }) {
   const dispatch = useDispatch();

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
         setError("Vyberte obrázky.");
         setShowError(true);
         return;
      }

      let errorCheck = false;

      files.forEach(file => {
         const fileName = file.name.length < 30 ? file.name : (file.name.slice(0, 30) + "...");

         if (file.size > 30*1024*1024) {
            errorCheck = true;
            setError("Veľkost súboru " + fileName + " je väčšia ako 30 MB.");
            setShowError(true);
         } else if (!file.name.match(/\.(jpg|jpeg)$/)) {
            errorCheck = true;
            setError("Súbor " + fileName + " nie je JPEG obrázok.");
            setShowError(true);
         }
      });

      if (errorCheck)
         return;

      let uploadErrors = "";

      await Promise.all(files.map(async (file, i) => {
         const fileName = file.name.length < 30 ? file.name : (file.name.slice(0, 30) + "...");
         const fileData = new FormData();
         fileData.append("image", file);

         const uploaded = await api.post("/gallery/" + modalSpecificProps.category, fileData, false);

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

      if (uploadErrors) {
         setError(uploadErrors);
         setShowError(true);
         return;
      }

      modalSpecificProps.callback();
      close();
   }

   return (
      <form className="modal-add-photo" onSubmit={onSubmit}>
         <InputDragNDrop
            accept=".jpg,.jpeg"
            multiple
            onFiles={onFiles}
            editable={!loading}
         />
         <InputButton value="Pridať" onClick={onSubmit} Icon={<PlusIcon />} loading={loading} />
         <CSSTransition
            in={showError}
            timeout={400}
            onEnter={el => el.style.maxHeight = "0px"}
            onEntering={el => el.style.maxHeight = el.scrollHeight + "px"}
            onExit={el => el.style.maxHeight = el.scrollHeight + "px"}
            onExiting={el => el.style.maxHeight = "0px"}
            unmountOnExit
         >
            <div className="modal-add-photo-error">{error}</div>
         </CSSTransition>
      </form>
   )
}

export default ModalAddCategory;
