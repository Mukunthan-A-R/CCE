import React, { useState } from "react";
import InputFilter from "../components/InputFilter";

const Home = () => {
  return (
    <div className="m-5 sm:m-10">
      <h2 className="text-center font-bold text-xl my-5">TNEA Choice Order </h2>
      <InputFilter></InputFilter>
      {/* <TableWithSort data={data}></TableWithSort> */}
    </div>
  );
};

export default Home;
