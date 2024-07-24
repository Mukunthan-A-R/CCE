import React, { useState } from "react";
import TableWithSort from "../components/TableWithSort";
import TableValues from "../data/DataChennai";
import { useRecoilState } from "recoil";
import { userCommunity } from "../data/atoms";
import { FaServer } from "react-icons/fa";
import { Link } from "react-router-dom";
const Home = () => {
  const [caste, setCaste] = useRecoilState(userCommunity);
  return (  
    <div className="m-0 sm:m-0">
      <div className="bg-blue-200 w-full h-14 px-10 flex items-center">

        <Link to="/result" className="">
          <div className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <FaServer />
          </div>
        </Link>
        <h1 className="w-full text-center font-bold">ADD YOUR COLLEGES</h1>
      </div>
      <div>

      <TableWithSort tableWithSort data={TableValues} community={caste}></TableWithSort>
      {/* Hello this is a set up comment */}
      </div>
    </div>
  );
};

export default Home;
