import React, { useState } from "react";
import { DataList } from "../data/DataList";
import ButtonComponent from "./ButtonComponent";

const CollegeList = () => {
  const [data, setData] = useState(DataList);
  //   console.log(data);
  return (
    <div>
      {/* <p>{data}</p> */}
      <div className="overflow-x-auto mx-5 md:mx-10">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-purple-100 border">ID</th>
              <th className="px-4 py-2 bg-purple-100 border">College Name</th>
              <th className="px-4 py-2 bg-purple-100 border">Department</th>
              <th className="px-4 py-2 bg-purple-100 border">Cut Off Marks</th>
              <th className="px-4 py-2 bg-purple-100 border"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2 border">{item.id}</td>
                <td className="px-4 py-2 border">{item.college_name}</td>
                <td className="px-4 py-2 border">{item.department}</td>
                <td className="px-4 py-2 border">{item.cut_off_marks}</td>
                <td className="px-4 py-2 border">
                  <ButtonComponent styles="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-red-500">
                    Add
                  </ButtonComponent>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollegeList;
