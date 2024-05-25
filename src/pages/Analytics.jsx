import React from "react";
import { resultArray, userValue, userCommunity } from "../data/atoms";
import { useRecoilValue } from "recoil";

const Analytics = () => {
  const community = useRecoilValue(userCommunity);
  const value = useRecoilValue(resultArray);
  const userData = useRecoilValue(userValue);

  return (
    <div>
      <p>Analytics</p>
      <div>
        <p>Applicant Name: {userData.name}</p>
        <p>Applicant Name: {userData.email}</p>
        <p>Applicant Community: {community.community}</p>
      </div>
      <div></div>
    </div>
  );
};

export default Analytics;
