import React from "react";
import InputFilter from "../components/InputFilter";
import CollegeList from "../components/CollegeList";

const Home = () => {
  return (
    <div className="my-5">
      <h2 className="text-center font-bold text-xl my-5">TNEA Choice Order </h2>
      <InputFilter></InputFilter>
      <CollegeList></CollegeList>
    </div>
  );
};

export default Home;
