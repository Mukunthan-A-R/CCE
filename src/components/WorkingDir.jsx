import React from "react";
import CollegePDF from "../assets/CollegeList.pdf";
import { sno } from "../data/atoms";
import { useRecoilState } from "recoil";
import { resultArray } from "../data/atoms";

const WorkingDir = () => {
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
    <div>
      <a
        className="sm:px-10 text-blue-900 font-medium"
        href={CollegePDF}
        download="CollegeList.pdf"
      >
        Download College List
      </a>
      {/* <button className="ml-10 " onClick={handleAdd}>
        ADDER
      </button> */}
    </div>
  );
};

export default WorkingDir;
