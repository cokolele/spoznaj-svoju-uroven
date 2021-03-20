import "src/styles/components/inputs.scss";

function InputText({ label, value, onChange, width, className, placeholder, required, error }) {
   const _onChange = (e) => {
      onChange(e.target.value);
   };

   return (
      <div className={`input-container ${className ? className : ""}`}>
         {
            label &&
            <span className="input-label">{label + ":"}</span>
         }
         {
            error && (
               <div className="input-error">{error}</div>
            )
         }
         <input className="input-text" type="text" value={value} onChange={_onChange} style={width && { width }} placeholder={placeholder} required={required}/>
      </div>
   );
}

export default InputText;
