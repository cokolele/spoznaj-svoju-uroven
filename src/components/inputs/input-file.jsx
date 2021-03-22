import "src/styles/components/inputs.scss";

import { randomString } from "src/utils/string.js";

function InputFile({ label, onFiles, className, name, value, multiple, accept, outline, grey }) {
   const randomId = randomString(40);

   const _onOpenFile = (e) => {
      if (multiple)
         onFiles(e.target.files);
      else
         onFiles(e.target.files[0]);
   }

   return (
      <div className={`input-container --no-grow ${className ? className : ""}`}>
         {
            label &&
            <label className="input-label" htmlFor={randomId}>{label + ":"}</label>
         }
         <label className={`input-label --button ${outline ? "--outline" : ""} ${grey ? "--grey" : ""}`} htmlFor={randomId}>
            { value }
         </label>
         <input
            type="file"
            className="input-file"
            onChange={_onOpenFile}
            id={randomId}
            name={name}
            multiple={multiple}
            accept={accept}
            tabIndex={11}
         />
      </div>
   );
}

export default InputFile;
