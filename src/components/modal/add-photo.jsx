import { useState } from "react";
import api from "src/utils/api/api.js";

import { useDispatch } from "react-redux";
import { setCategory } from "src/state/gallerySlice.js";

function ModalAddCategory({ close }) {
   const dispatch = useDispatch();

   const [files, setFiles] = useState([]);
   const [error, setError] = useState("");

   const onChange = e => {
      if (error)
         setError("");

      setName(e.target.value);
   }

   const onAddFile = async (e, file) => {
      if (!file) {
         const inputElHidden = document.createElement("input");
         inputElHidden.setAttribute("type", "file");
         inputElHidden.setAttribute("accept", ".wld");
         inputElHidden.addEventListener("input", async () => {
            onAddFile(null, inputElHidden.files[0]);
         });
         inputElHidden.click();
      } else {
         setError("");

         if (!file.name.includes(".wld")) {
            setError("Please select .wld file format");
            return;
         }

         if (file.size > 20*1024*1024) {
            setError("File exceeded size limit (20 MB)");
            return;
         }

         const valid = await verifyWorldFileFormat(file);
         if (!valid)
            setError("Invalid world file format");

         const fileData = new FormData();
         fileData.append("map", file);

         const mapUpload = await api.post("/user/maps", fileData, false);

         if (mapUpload.status != "ok") {
            setError(mapUpload.message);
            return;
         }

         setError("");
         fetchMaps();
      }
   }

   return (
      <form>
         <input type="text" onChange={onChange} value={name}/>
         <input type="submit" onClick={onAddFile} value="+ Pridať"/>
         <div className="error">{error}</div>
      </form>
   )
}

export default ModalAddCategory;
