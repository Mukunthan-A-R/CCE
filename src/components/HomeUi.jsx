import React from 'react'
import { Link } from 'react-router-dom'
import Banner from "../assets/Banner.jpg";
import { FaServer } from "react-icons/fa";

const HomeUi = () => {
  return (
    <>
        <div className="bg-blue-200 w-full h-14 px-10 flex items-center">
        <Link to="/result" className="">
          <div className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <FaServer />
          </div>
        </Link>
        <h1 className="w-full text-center font-bold">ADD YOUR COLLEGES</h1>
      </div>
      <div className="relative">
        <img src={Banner} className="w-full mb-10 object-cover" />
        <h2 className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">TNEA CHOICE FILLING</h2>
      </div>
    </>
  )
}

export default HomeUi