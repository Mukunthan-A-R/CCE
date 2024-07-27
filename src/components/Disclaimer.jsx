import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";

const Disclaimer = () => {
  return (
    <div className="flex flex-col justify-center items-center text-red-600 my-8">
      <div className="flex ">
        <FaTriangleExclamation size={30} />
        <span className="text-lg ml-2"> Note:</span>
      </div>
      <ul className="text-center">
        <li>* For reference purpose only</li>
        <li>
          * Choice list preparations based on NBA, NAAC and quality seat Intake,
          center of Excellence, Placements and Faculty retention
        </li>
      </ul>
    </div>
  );
};

export default Disclaimer;
