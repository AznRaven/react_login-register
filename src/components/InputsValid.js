import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const InputsValid = ({
  id,
  label,
  icon,
  valid,
  value,
  onChange,
  required,
  type,
  ariaInvalid,
  ariaDescribedBy,
  onFocus,
  onBlur,
}) => {
  return (
    <div>
      <label htmlFor={id}>
        {label}:
        <FontAwesomeIcon
          icon={icon}
          className={valid ? "valid" : value ? "invalid" : "hide"}
        />
      </label>
      <input
        type={type}
        id={id}
        autoComplete="off"
        onChange={onChange}
        value={value}
        required={required}
        aria-invalid={ariaInvalid ? "false" : "true"}
        aria-describedby={ariaDescribedBy}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputsValid;
