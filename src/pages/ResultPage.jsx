import React from "react";
import { useRecoilValue } from "recoil";
import resultArray from "../data/atoms";
import { Link } from "react-router-dom";

const ResultPage = () => {
  const value = useRecoilValue(resultArray);
  console.log(value);
  return (
    <div>
      <Link to="/">Home Page</Link>
      {value.map((item) => (
        <div key={item.sNo}>
          <p>ID: {item.sNo}</p>
          <p>Name: {item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultPage;
