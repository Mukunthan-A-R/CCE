import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { resultArray } from "../data/atoms";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import { MdDelete } from "react-icons/md";

const ResultPage = () => {
  const value = useRecoilValue(resultArray);
  const [resultData, setResultData] = useRecoilState(resultArray);
  console.log(value);

  const handleDelete = (row) => {
    setResultData(resultData.filter((item) => item.sNo !== row.sNo));

    // resultData.filter((item) => item.id != row.sNo)
  };
  return (
    <div>
      <Link to="/">Home Page</Link>

      {value.length === 0 ? (
        <p>No Colleges selected</p>
      ) : (
        <table className="min-w-full  divide-y divide-gray-200 mx-2 sm:mx-5">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                S.No
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                Region
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                College Code
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                Branch Code
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                Branch Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"></th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                BC
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                BCM
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                MBC
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                Drop
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {value.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.entries(row).map(([key, value], cellIndex) => (
                  <td key={cellIndex} className="px-3 py-4 whitespace-nowrap">
                    {value}
                  </td>
                ))}
                <td>
                  <ButtonComponent
                    styles="bg-red-500 p-2 rounded-lg text-white hover:bg-green-700"
                    handleClick={() => {
                      handleDelete(row);
                      console.log("Deleted");
                      console.log(row);
                    }}
                  >
                    <MdDelete />
                  </ButtonComponent>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResultPage;
