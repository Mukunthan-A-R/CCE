import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { useRecoilState } from "recoil";
import { resultArray } from "../data/atoms";

const TableWithSort = ({ data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState(null);
  // Atoms data
  const [resultData, setResultData] = useRecoilState(resultArray);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedDataByKey = () => {
    if (sortConfig !== null) {
      const sorted = [...data].sort((a, b) => {
        if (
          sortConfig.key === "oc" ||
          sortConfig.key === "bc" ||
          sortConfig.key === "bcm" ||
          sortConfig.key === "mbc"
        ) {
          return sortConfig.direction === "ascending"
            ? parseFloat(a[sortConfig.key]) - parseFloat(b[sortConfig.key])
            : parseFloat(b[sortConfig.key]) - parseFloat(a[sortConfig.key]);
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        }
      });
      setSortedData(sorted);
    } else {
      setSortedData(data);
    }
  };

  // Add data to the ResultPage
  const handleResult = (row) => {
    setResultData([...resultData, row]);
    // atom data
    console.log("Atom Data");
    console.log(resultData.length);
    console.log([...resultData, row]);
  };

  React.useEffect(() => {
    sortedDataByKey();
  }, [sortConfig]);

  return (
    <table className="min-w-full  divide-y divide-gray-200 mx-5 sm:mx-10">
      <thead className="bg-blue-100">
        <tr>
          <th
            className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("sNo")}
          >
            S.No
            {sortConfig && sortConfig.key === "sNo" && (
              <span className="ml-1">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("region")}
          >
            Region
            {sortConfig && sortConfig.key === "region" && (
              <span className="ml-1">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("collegeCode")}
          >
            College Code
            {sortConfig && sortConfig.key === "collegeCode" && (
              <span className="ml-1">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("name")}
          >
            Name
            {sortConfig && sortConfig.key === "name" && (
              <span className="ml-1">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("branchCode")}
          >
            Branch Code
            {sortConfig && sortConfig.key === "branchCode" && (
              <span className="ml-1">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("branchName")}
          >
            Branch Name
            {sortConfig && sortConfig.key === "branchName" && (
              <span className="ml-1">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("oc")}
          >
            OC
            {sortConfig && sortConfig.key === "oc" && (
              <span className="ml-1">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("bc")}
          >
            BC
            {sortConfig && sortConfig.key === "bc" && (
              <span className="ml-1">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("bcm")}
          >
            BCM
            {sortConfig && sortConfig.key === "bcm" && (
              <span className="ml-1">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("mbc")}
          >
            MBC
            {sortConfig && sortConfig.key === "mbc" && (
              <span className="ml-1">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
            Add
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sortedData.map((row, rowIndex) => (
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
                  handleResult(row);
                }}
              >
                Add
              </ButtonComponent>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableWithSort;
