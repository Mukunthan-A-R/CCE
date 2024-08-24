import React from "react";
import { Link } from "react-router-dom";
import Banner from "../assets/Banner.jpg";
import { FaServer } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { userData } from "../data/atoms";
const HomeUi = () => {
  const { cutOff, name, community } = useRecoilValue(userData);

  function capitalizeFirstLetter(str) {
    if (str.length === 0) {
      return str; // Return an empty string as is
    }

    // Convert the first letter to uppercase
    let firstLetter = str.charAt(0).toUpperCase();

    // Get the rest of the string
    let restOfString = str.slice(1);

    // Combine the uppercase first letter with the rest of the string
    return firstLetter + restOfString;
  }

  return (
    <>
      <div className="bg-blue-500 w-full h-14 px-10 flex items-center">
        <Link to="/result" className="">
          <div className="bg-blue-700  hover:bg-blue-900 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <FaServer />
          </div>
        </Link>
        <h1 className="w-full text-white text-center text-lg font-medium">
          Step into Tomorrow: Select Your Ideal College and Begin Your TNEA
          Counseling Journey!
        </h1>
      </div>
      <div className="relative">
        <img src={Banner} className="w-full mb-10 object-cover" />
        <h2 className="absolute inset-0 top-1/6 flex items-center justify-center text-white font-bold text-3xl">
          Welcome {capitalizeFirstLetter(name) ? capitalizeFirstLetter(name) : "Expert"}
        </h2>
        <h2 className="absolute inset-0 top-1/4 flex items-center justify-center text-white font-semibold text-2xl">
          Comunity: {community ? community.toUpperCase() : "N/A"}
        </h2>
        <h2 className="absolute inset-0 top-1/2 flex items-center justify-center text-white font-semibold text-2xl">
          Cut off: {cutOff ? cutOff : "N/A"}
        </h2>
      </div>
    </>
  );
};

export default HomeUi;
