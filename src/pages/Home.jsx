import React, { useState } from "react";
import TableWithSort from "../components/TableWithSort";
import TableValues from "../data/DataChennai";
import { useRecoilState } from "recoil";
import { userCommunity } from "../data/atoms";
import { Link } from "react-router-dom";
import InputFilter from "../components/InputFilter";
import TableFilter from "../components/TableFilter";
import HomeUi from "../components/HomeUi";


const Home = () => {
  const [caste, setCaste] = useRecoilState(userCommunity);
  return (  
    <div className="m-0 sm:m-0">
      <HomeUi></HomeUi>
      <TableFilter></TableFilter>
      <TableWithSort tableWithSort data={TableValues} community={caste}></TableWithSort>
      
    </div>
  );
};

export default Home;
