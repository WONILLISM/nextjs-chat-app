import React, { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextField = ({ label, ...inputElement }: TextFieldProps) => {
  return (
    <div className="relative pt-2 mt-1">
      {label && (
        <label
          htmlFor={inputElement.name}
          className="absolute top-0 left-1 block transition-[0.2s] text-xs text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        className="w-full p-2 mt-2 bg-gray-100 border border-t-0 border-b-2 border-x-0 border-b-gray-400 outline-0 rounded-t-md required:shadow-none invalid:shadow-none focus:bg-gray-200"
        type="text"
        {...inputElement}
      />
    </div>
  );
};

export default TextField;
