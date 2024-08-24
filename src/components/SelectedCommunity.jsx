import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { sno, userData, resultArray } from "../data/atoms";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import SuccessfullyAdded from "./SuccessfullyAdded";
import { MdDelete } from "react-icons/md";
import ButtonComponent from "./ButtonComponent";

const SelectedCommunity = ({ data, community }) => {
  const displayedCommunities = ["oc", "bc", "bcm", "mbc", "sc", "sca", "st"];
  const communityColor = community;
  let userCommunity = ["oc"];
  if (displayedCommunities.includes(communityColor) && communityColor !== "oc") {
    userCommunity.push(communityColor);
  }

  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [remove, Setremove] = useState(false);
  const [InitialNo, SetInitialNo] = useRecoilState(sno);
  const [userCutoff, setUserCutoff] = useRecoilState(userData);
  const [resultData, setResultData] = useRecoilState(resultArray);
  const [content, SetContent] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Ensure 50 items per page

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

  const handleResult = (row) => {
    const modifyRow = { ...row, sNo: InitialNo, id: row.sNo };
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
      const modified = list.map((data, index) => ({
        ...data,
        sNo: index + 1,
      }));
      return modified;
    });

    if (flag === 1) {
      SetInitialNo((prev) => prev + 1);
    } else {
      SetInitialNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    sortedDataByKey();
  }, [sortConfig, data]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClosePopup();
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showPopup]);

  // Filter and pagination logic
  const filteredData = sortedData.filter(row =>
    Object.entries(row).some(([key, value]) => userCommunity.includes(key) && value < 179)
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {showPopup && (
        <SuccessfullyAdded
          handleClick={handleClosePopup}
          content={content}
          remove={remove}
        />
      )}
      <table className="min-w-full divide-y divide-gray-200 mx-2">
        <thead className="bg-blue-100">
          <tr>
            {/* Table headers */}
            <th
              className="px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("sNo")}
            >
              <div className="flex justify-center">
                S.No
                {sortConfig && sortConfig.key === "sNo" && (
                  <span className="ml-1">
                    {sortConfig.direction === "ascending" ? (
                      <FaArrowCircleDown size={15} />
                    ) : (
                      <FaArrowCircleUp size={15} />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("region")}
            >
              <div className="flex justify-center">
                Zone
                {sortConfig && sortConfig.key === "region" && (
                  <span className="ml-1">
                    {sortConfig.direction === "ascending" ? (
                      <FaArrowCircleUp size={15} />
                    ) : (
                      <FaArrowCircleDown size={15} />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("collegeCode")}
            >
              Clg Code
              {sortConfig && sortConfig.key === "collegeCode" && (
                <span className="ml-1">
                  {sortConfig.direction === "ascending" ? (
                    <FaArrowCircleUp size={15} />
                  ) : (
                    <FaArrowCircleDown size={15} />
                  )}
                </span>
              )}
            </th>
            <th
              className="px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("name")}
            >
              <div className="flex items-center">
                Name
                {sortConfig && sortConfig.key === "name" && (
                  <span className="ml-1">
                    {sortConfig.direction === "ascending" ? (
                      <FaArrowCircleUp size={15} />
                    ) : (
                      <FaArrowCircleDown size={15} />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("branchCode")}
            >
              <div className="flex items-center">
                Branch Code
                {sortConfig && sortConfig.key === "branchCode" && (
                  <span className="ml-1">
                    {sortConfig.direction === "ascending" ? (
                      <FaArrowCircleUp size={15} />
                    ) : (
                      <FaArrowCircleDown size={15} />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("Branch Name")}
            >
              Branch Name
              {sortConfig && sortConfig.key === "Branch Name" && (
                <span className="ml-1">
                  {sortConfig.direction === "ascending" ? (
                    <FaArrowCircleUp size={15} />
                  ) : (
                    <FaArrowCircleDown size={15} />
                  )}
                </span>
              )}
            </th>
            {userCommunity.map((community) => (
              <th
                key={community}
                className={`px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer ${
                  communityColor === community ? "bg-green-200" : ""
                }`}
              >
                <div className="flex items-center">
                  {community.toUpperCase()}
                  {sortConfig && sortConfig.key === community && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? (
                        <FaArrowCircleUp size={15} />
                      ) : (
                        <FaArrowCircleDown size={15} />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th className="px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayedData.map((row) => (
            <tr
              key={row.sNo}
              className="text-xs hover:bg-blue-200 focus:bg-red-500 active:bg-green-500 transition-colors duration-100 ease-in-out cursor-pointer"
            >
              <td className="px-auto py-4 whitespace-nowrap pl-2 border">{row.sNo}</td>
              <td className="px-auto py-4 whitespace-nowrap pl-2 border">{row.region}</td>
              <td className="px-auto py-4 whitespace-nowrap pl-2 border">{row.collegeCode}</td>
              <td className="px-auto py-4 whitespace-nowrap pl-2 border">{row.name}</td>
              <td className="px-auto py-4 whitespace-nowrap pl-2 border">{row.branchCode}</td>
              <td className="px-auto py-4 whitespace-nowrap pl-2 border">{row["Branch Name"]}</td>

              {userCommunity.map((community) => (
                <td
                  key={`${row.sNo}-${community}`}
                  className={`px-auto py-4 whitespace-nowrap pl-2 border ${
                    communityColor === community ? "bg-green-200" : ""
                  }`}
                >
                  {row[community]}
                </td>
              ))}

              <td className="px-auto py-4 whitespace-nowrap pl-2 border">
                <ButtonComponent
                  styles="p-2 rounded-lg text-white cursor-pointer"
                  handleClick={() => handleResult(row)}
                >
                  {resultData.find((val) => val.id === row.sNo) ? (
                    <button
                      style={{
                        color: "red",
                        marginLeft: "4px",
                        fontSize: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0px",
                      }}
                      onClick={() => {
                        setShowPopup(true);
                        SetContent(
                          "The selected item has been removed from the list successfully"
                        );
                        Setremove(true);
                      }}
                    >
                      <MdDelete />
                    </button>
                  ) : (
                    <button
                      style={{
                        backgroundColor: "#1E88E5",
                        padding: "7px",
                        borderRadius: "3px",
                      }}
                      onClick={() => {
                        setShowPopup(true);
                        SetContent(
                          "The selected item has been added to the list successfully"
                        );
                        Setremove(false);
                      }}
                    >
                      Add
                    </button>
                  )}
                </ButtonComponent>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4">
          <div className="flex items-center">
            <button
              className="mx-2 px-4 py-2 border rounded-md bg-blue-500 text-white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="mx-2 px-4 py-2 border rounded-md bg-blue-500 text-white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedCommunity;
