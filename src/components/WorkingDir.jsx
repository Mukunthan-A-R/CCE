import React, { useState } from "react";
import CollegePDF from "../assets/CollegeList.pdf";
import { sno } from "../data/atoms";
import { useRecoilState } from "recoil";
import { resultArray } from "../data/atoms";

const WorkingDir = ({setIsRoundTwo, isRoundTwo}) => {
  const [InitialNo, SetInitialNo] = useRecoilState(sno);
  const [resultData, setResultData] = useRecoilState(resultArray);

  const data = [
    {
      sNo: 1,
      region: "Chennai",
      collegeCode: "1",
      name: "University Departments of Anna University - CEG Campus",
      branchCode: "CS",
      "Branch Name": "COMPUTER SCIENCE AND ENGINEERING",
      oc: 199.5,
      bc: 199,
      bcm: 198.5,
      mbc: 199,
    },
    {
      sNo: 2,
      region: "Chennai",
      collegeCode: "1",
      name: "University Departments of Anna University - CEG Campus",
      branchCode: "CE",
      "Branch Name": "CIVIL ENGINEERING",
      oc: 193,
      bc: 190,
      bcm: 192,
      mbc: 187,
    },
    {
      sNo: 3,
      region: "Chennai",
      collegeCode: "1",
      name: "University Departments of Anna University - CEG Campus",
      branchCode: "CM",
      "Branch Name": "COMPUTER SCIENCE AND ENGINEERING (SS)",
      oc: 199.5,
      bc: 199,
      bcm: 198.5,
      mbc: 199,
    },
  ];

  // Add data to the ResultPage
  const handleAdd = () => {
    console.log("HELLO BRO");
    console.log(data);
    data.map((row) => {
      // Setting new serial number for selected data
      const modifyRow = { ...row, sNo: InitialNo, id: row.sNo };
      // atom data
      console.log("modifyRow", modifyRow);
      let flag = 0;
      setResultData((prev) => {
        const list = [...prev];
        const find = list.findIndex((items) => items.id === row.sNo);
        if (find === -1) {
          list.push(modifyRow);
          flag = 1;
        } else {
          list.splice(find, 1);
          flag = 0;
        }
        console.log(list);
        const modified = list.map((data, index) => ({
          ...data,
          sNo: index + 1,
        }));
        return modified;
      });

      // setResultData([...resultData, modifyRow]);
      // console.log([...resultData, modifyRow]);
      if (flag === 1) {
        SetInitialNo((prev) => prev + 1);
      } else {
        SetInitialNo((prev) => prev + 1);
      }
      console.log("Atom Data");
      console.log(resultData.length);
      /* console.log([...resultData,row])
    console.log([...resultData, row]); */
      console.log(resultData);
    });
  };

  return (
    <div className="flex items-center">
      <a
        className="sm:px-10 text-blue-900 font-medium"
        href={CollegePDF}
        download="CollegeList.pdf"
      >
        Download College List
      </a>
      {/* Toggle Button */}
      <label className="flex items-center ml-5 cursor-pointer">
        <span className="mr-2 text-gray-700 font-medium">Filter available Colleges</span>
        <div className="relative">
          <input
            type="checkbox"
            id="roundTwoToggle"
            className="sr-only"
            checked={isRoundTwo}
            onChange={() => setIsRoundTwo(!isRoundTwo)}
          />
          <div
            className={`block w-12 h-7 rounded-full ${
              isRoundTwo ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${
                isRoundTwo ? "transform translate-x-full" : ""
              }`}
            ></div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default WorkingDir;