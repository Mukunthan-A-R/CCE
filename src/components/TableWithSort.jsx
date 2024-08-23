import React, { useState, useEffect } from "react";
import ButtonComponent from "./ButtonComponent";
import { useRecoilState } from "recoil";
import { resultArray } from "../data/atoms";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import SuccessfullyAdded from "./SuccessfullyAdded";
import { MdDelete } from "react-icons/md";
import { sno } from "../data/atoms";
import { userData } from "../data/atoms";

const TableWithSort = ({ data, community }) => {
  // console.log("😂", JSON.stringify(data[0]));
  let displayedCommunities = ["oc", "bc", "bcm", "mbc", "sc", "sca", "st"];

  const communityColor = community;
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [remove, Setremove] = useState(false);
  const [InitialNo, SetInitialNo] = useRecoilState(sno);
  // Atoms data
  const [userCutoff, setUserCutoff] = useRecoilState(userData);
  const [resultData, setResultData] = useRecoilState(resultArray);
  const [content, SetContent] = useState("");

  let check;
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

    /* setResultData([...resultData, modifyRow]);
    console.log([...resultData,modifyRow]) */
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
  };

  React.useEffect(() => {
    sortedDataByKey();
  }, [sortConfig, data]);

  // Function to handle closing the popup
  const handleCommunity = () => {
    const usersCommunity = community.community;
  };
  const handleClosePopup = () => {
    // Set showPopup to false to hide the popup
    setShowPopup(false);
  };

  useEffect(() => {
    // Close the popup after 3 seconds
    const timeoutId = setTimeout(() => {
      handleClosePopup();
    }, 1000);

    // Cleanup the timeout when component unmounts or when showPopup changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showPopup]);

  return (
    <div className="flex justify-center">
      {showPopup && (
        <SuccessfullyAdded
          handleClick={handleClosePopup}
          content={content}
          remove={remove}
        ></SuccessfullyAdded>
      )}
      <table className="min-w-full  divide-y divide-gray-200  mx-2">
        <thead className="bg-blue-100">
          <tr>
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
              className="px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer flex items-center"
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
              className=" px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer "
              onClick={() => requestSort("branchCode")}
            >
              <div className="flex items-center">
                Branch Code
                {sortConfig && sortConfig.key === "branchCode" && (
                  <span className="ml-1">
                    {sortConfig.direction === "ascending" ? (
                      <FaArrowCircleUp size={15} />
                    ) : (
                      <FaArrowCircleUp size={15} />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer flex items-center"
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
            {/* display only the req communities */}
            {displayedCommunities.map((community) => (
              <th
                key={community}
                className={`px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer ${
                  communityColor === community ? "bg-green-200" : ""
                }`}
                // onClick={() => requestSort(community)}
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

            <th className={`px-1 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer`}>
              Add
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="text-xs hover:bg-blue-200 focus:bg-red-500 active:bg-green-500 transition-colors duration-100 ease-in-out cursor-pointer"
            >
              {Object.entries(row).map(([key, value], cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-auto py-4 whitespace-nowrap pl-2 border 
                  ${
                    (cellIndex == 6 && row.oc > 142) ||
                    (cellIndex == 7 && row.bc > 142) ||
                    (cellIndex == 8 && row.bcm > 142) ||
                    (cellIndex == 9 && row.sc > 142) ||
                    (cellIndex == 10 && row.sca > 142) ||
                    (cellIndex == 11 && row.st > 142) ||
                    (cellIndex == 12 && row.oc > 142)
                      ? "bg-red-200" 
                      : " "
                  } 
                  ${
                    (communityColor === "oc" && cellIndex == 6) ||
                    (communityColor === "bc" && cellIndex == 7) ||
                    (communityColor === "bcm" && cellIndex == 8) ||
                    (communityColor === "mbc" && cellIndex == 9) ||
                    (communityColor === "sc" && cellIndex == 10) ||
                    (communityColor === "sca" && cellIndex == 11) ||
                    (communityColor === "st" && cellIndex == 12)
                      ? "bg-green-300"
                      : " "
                  }  
                  `}
                >
                  {value}
                </td>
              ))}
              <td className={`  ${
                    (userCutoff.community == "oc" && row.oc > 142) ||
                    ( userCutoff.community == "bc" && row.bc > 142) ||
                    ( userCutoff.community == "bcm" && row.bcm > 142) ||
                    ( userCutoff.community == "sc" && row.sc > 142) ||
                    ( userCutoff.community == "sca" && row.sca > 142) ||
                    ( userCutoff.community == "st" && row.st > 142) ||
                    ( userCutoff.community == "oc" && row.oc > 142)
                      ? "bg-blue-200 hidden"
                      : " "
                  }  `}>
                <ButtonComponent
                  styles=" p-2 rounded-lg text-white  /* transition-colors duration-100 ease-in-out */ cursor-pointer"
                  handleClick={() => {
                    handleResult(row);
                  }}
                >
                  {
                    (check = resultData.find((val) => val.id === row.sNo) ? (
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
                            " The selected item has been removed to the list successsfully"
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
                            " The selected item has been added to the list successsfully"
                          );
                          Setremove(false);
                        }}
                      >
                        Add
                      </button>
                    ))
                  }
                </ButtonComponent>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithSort;
