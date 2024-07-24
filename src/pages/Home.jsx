import React, { useState } from "react";
import TableWithSort from "../components/TableWithSort";
import TableValues from "../data/DataChennai";
import { useRecoilState } from "recoil";
import { userCommunity } from "../data/atoms";
import TableFilter from "../components/TableFilter";
import HomeUi from "../components/HomeUi";
import InputFilter from "../components/InputFilter";


const Home = () => {
  const [caste, setCaste] = useRecoilState(userCommunity);
  return (  
    <div className="m-0 sm:m-0">
      <HomeUi></HomeUi>
      <TableFilter></TableFilter>
      {/* <InputFilter></InputFilter> */}
    </div>
  );
};

export default Home;
