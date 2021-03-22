import "src/styles/components/inputs.scss";

import Loader from "src/components/loader.jsx";

function InputButton({ value, label, onClick, className, Icon, submit, outline, grey, loading, disabled }) {
   const _onClick = e => {
      if (!disabled)
         onClick(e);
   }

   return (
      <div className={`input-container --no-grow ${className ? className : ""}`}>
         {
            label &&
            <span className="input-label" htmlFor={randomId}>{label + ":"}</span>
         }
         <button
            type={submit ? "submit" : "button"}
            className={`input-button ${outline ? "--outline" : ""} ${grey ? "--grey" : ""} ${(disabled || loading) ? "--disabled" : ""}`}
            onClick={_onClick}
         >
            {
               Icon &&
               <div className="input-icon">
                  { Icon }
               </div>
            }
            {
               value &&
               <span className="input-label">{value}</span>
            }
            {
               loading &&
               <Loader/>
            }
         </button>
      </div>
   );
}

export default InputButton;
