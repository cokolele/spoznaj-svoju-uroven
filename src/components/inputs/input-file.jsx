import { useRef } from "react";
import "src/styles/components/inputs.scss";

import { randomString } from "src/utils/string.js";

function InputFile({ label, onFiles, className, name, value, multiple, accept, outline, grey }) {
   const randomId = randomString(40);
   const inputFileRef = useRef();

   const onOpenFile = (e) => {
      if (multiple)
         onFiles(e.target.files);
      else
         onFiles(e.target.files[0]);
   }

   const onKeyDown = (e) => {
      inputFileRef.current.click();
   }

   return (
      <div className={`input-container --no-grow ${className ? className : ""}`}>
         {
            label &&
            <label className="input-label" htmlFor={randomId}>{label + ":"}</label>
         }
         <label className={`input-label --button ${outline ? "--outline" : ""} ${grey ? "--grey" : ""}`} htmlFor={randomId} tabIndex="0" onKeyDown={onKeyDown}>
            { value }
         </label>
         <input
            type="file"
            className="input-file"
            onChange={onOpenFile}
            id={randomId}
            name={name}
            multiple={multiple}
            accept={accept}
            tabIndex={-1}
            ref={inputFileRef}
         />
      </div>
   );
}

export default InputFile;
