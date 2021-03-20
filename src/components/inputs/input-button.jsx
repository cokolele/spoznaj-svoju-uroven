import "src/styles/components/inputs.scss";

function InputButton({ label, onClick, className, Icon, IconLeft, IconRight, submit, error }) {
   return (
      <div className={`input-container --no-grow ${className ? className : ""}`}>
         <button
            type={submit ? "submit" : "button"}
            className="input-button"
            onClick={onClick}
         >
            {
               IconLeft &&
               <div className="input-icon">
                  { IconLeft }
               </div>
            }
            {
               label &&
               <span className="input-label">{label}</span>
            }
            {
               IconRight &&
               <div className="input-icon">
                  { IconRight }
               </div>
            }
            {
               Icon &&
               <div className="input-icon">
                  { Icon }
               </div>
            }
         </button>
         {
            error && (
               <div className="input-error">{error}</div>
            )
         }
      </div>
   );
}

export default InputButton;
