import "src/styles/components/inputs.scss";

function InputRow({ children, className }) {
   return (
      <div className={`input-row ${className ? className : ""}`}>
         { children }
      </div>
   );
}

export default InputRow;
