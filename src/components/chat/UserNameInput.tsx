import React, { InputHTMLAttributes } from "react";

type UserNameInputProps = InputHTMLAttributes<HTMLInputElement>;

const UserNameInput = ({ ...rest }: UserNameInputProps) => {
  return (
    <div className="h-20 p-4 bg-[#D8E9F3] rounded">
      <div className="flex flex-row flex-1 h-full divide-x divide-gray-200">
        <div className="flex-1 pr-2">
          <input
            className="w-full h-full px-2 text-black border border-gray-600 rounded shadow "
            {...rest}
          />
        </div>
        <div className="flex flex-col items-stretch justify-center pl-2">
          <button
            className="h-full px-2 text-sm rounded shadow bg-[#3D89CD] text-white"
            onClick={() => {}}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserNameInput;
