import React from "react";
import { resultArray, userValue, userCommunity } from "../data/atoms";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

const Analytics = () => {
  const community = useRecoilValue(userCommunity);
  const TableData = useRecoilValue(resultArray);
  const userData = useRecoilValue(userValue);

  return (
    <div>
      <Link to="/">Home</Link>
      <div className="m-5">
        <p className="font-medium">User Data</p>
        <p>Applicant Name : {userData.name}</p>
        <p>Applicant Email : {userData.email}</p>
        <p>Applicant Cut Off : {userData.cutOff}</p>
        <p>Applicant Community : {community.community}</p>
      </div>
      <div className="m-5">
        <p className="font-medium">College Data</p>
        {TableData.map((item) => {
          <p>{item.name}</p>;
        })}
      </div>
    </div>
  );
};

export default Analytics;
