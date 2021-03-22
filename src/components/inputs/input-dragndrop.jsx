import { useState, useEffect } from "react";
import "src/styles/components/inputs.scss";

import InputFile from "src/components/inputs/input-file.jsx";
import { AddPhotoIcon } from "src/components/icon.jsx";
import LazyImage from "src/components/lazy-image.jsx";

function InputDragNDrop({ onFiles, className, multiple, accept, editable }) {
   const [files, setFiles] = useState([]);
   const [dragging, setDragging] = useState(0);

   useEffect(() => {
      onFiles(files);
   }, [files]);

   const onDragEnter = e => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(dragging + 1);
   };

   const onDragLeave = e => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(dragging - 1);
   };

   const onDrop = e => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(0);
      setFiles(Object.values(e.dataTransfer.files));
   };

   const onFileInputFiles = (files) => {
      setFiles(Object.values(files));
   }

   const removeFile = (index) => {
      if (editable)
         setFiles(files.filter((file, i) => index != i));
   }

   const onDragOver = e => {
      e.preventDefault();
      e.stopPropagation();
   };

   return (
      <div
         className={`input-dragndrop ${className ? className : ""} ${dragging ? "--dragging" : ""} ${files.length ? "--preview" : ""}`}
         onDrop={e => onDrop(e)}
         onDragOver={e => onDragOver(e)}
         onDragEnter={e => onDragEnter(e)}
         onDragLeave={e => onDragLeave(e)}
      >
         {
            files.length != 0 &&
            <div className={`input-dragndrop-preview ${editable ? "--editable" : ""}`}>
               {
                  files.map((file, i) => {
                     if (file.size != 0) {
                        return (
                           <div className="input-dragndrop-preview-photo" key={i}>
                              <LazyImage placeholder={file.name.match(/\.(png|jpg|jpeg|gif)$/) ? "/images/default-photo.jpg" : "/images/default-file.jpg"} full={file}/>
                              <div className="input-dragndrop-preview-photo-description">{file.name}</div>
                              <button type="button" className="input-dragndrop-preview-photo-remove" onClick={() => {removeFile(i)}}>Odstrániť</button>
                           </div>
                        )
                     }
                  })
               }
            </div>
         }
         <div className="input-dragndrop-asker">
            <AddPhotoIcon />
            <div className="input-label">
               Sem presuňte fotky<br/>
               <span>alebo</span>
            </div>
            <InputFile
               name="files"
               value="Vyberte súbory"
               accept=".jpg,.jpeg"
               multiple
               onFiles={onFileInputFiles}
               grey outline
            />
         </div>
      </div>
   );
}

export default InputDragNDrop;
