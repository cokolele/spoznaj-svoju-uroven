import "src/styles/components/inputs.scss";

function InputButton({ value, label, onClick, className, Icon, submit, outline, grey }) {
   return (
      <div className={`input-container --no-grow ${className ? className : ""}`}>
         {
            label &&
            <span className="input-label" htmlFor={randomId}>{label + ":"}</span>
         }
         <button
            type={submit ? "submit" : "button"}
            className={`input-button ${outline ? "--outline" : ""} ${grey ? "--grey" : ""}`}
            onClick={onClick}
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
         </button>
      </div>
   );
}

export default InputButton;
