import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  required = false,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium common-text mb-1">
        {label.concat(required ? ' *' : '')}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="common-input"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;
