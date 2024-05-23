import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

const DataSubmitted = ({ handleClick }) => {
  return (
    <div class="fixed top-0 right-0 flex items-start justify-end p-4 z-50 ">
      <div class="rounded-lg p-4 shadow-xl bg-green-300">
        <div class="flex justify-between">
          <p class="font-semibold mb-4 text-sm">Data Updated</p>
          <div onClick={handleClick}>
            <IoMdCloseCircle />
          </div>
        </div>
        <p class="text-gray-600 text-xs">
          The User Data is Successfully Updated !
        </p>
      </div>
    </div>
  );
};

export default DataSubmitted;
