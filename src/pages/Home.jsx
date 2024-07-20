import React, { useState } from "react";
import InputFilter from "../components/InputFilter";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="m-0 sm:m-0">
      <InputFilter></InputFilter>
      <Link to="/data">.</Link>
    </div>
  );
};

export default Home;
