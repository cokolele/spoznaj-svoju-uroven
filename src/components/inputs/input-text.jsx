import "src/styles/components/inputs.scss";

import { randomString } from "src/utils/string.js";

function InputText({ name, label, value, onChange, className, placeholder, required }) {
   const randomId = randomString(40);

   const _onChange = (e) => {
      onChange(e.target.value);
   };

   return (
      <div className={`input-container ${className ? className : ""}`}>
         {
            label &&
            <label className="input-label" htmlFor={randomId}>{label + ":"}</label>
         }
         <input
            value={value}
            onChange={_onChange}
            className="input-text"
            type="text"
            name={name}
            id={label ? randomId : null}
            placeholder={placeholder}
            required={required}
         />
      </div>
   );
}

export default InputText;
