import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

const SuccessfullyAdded = () => {
  return (
    <div class="fixed top-0 right-0 flex items-start justify-end p-4 z-50 ">
      <div class="rounded-lg p-6 shadow-xl bg-green-300">
        <div class="flex justify-between">
          <p class="font-semibold mb-4 text-sm">Item Added</p>
          <IoMdCloseCircle />
        </div>
        <p class="text-gray-600 text-xs">
          The selected item has been added to the list successsfully
        </p>
      </div>
    </div>
  );
};

export default SuccessfullyAdded;
