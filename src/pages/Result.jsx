import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { resultArray as resultDataAtom, userData } from "../data/atoms";
import { Link } from "react-router-dom";
import { IoIosPrint, IoMdExit } from "react-icons/io";
import { FaDownload, FaHome } from "react-icons/fa";
import { MdDelete, MdDownloading } from "react-icons/md";
import AlertPopup from "../components/AlertPopup";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaTriangleExclamation } from "react-icons/fa6";
import Disclaimer from "../components/Disclaimer";
import { BiExport } from "react-icons/bi";
import { CgImport } from "react-icons/cg";




const Result = () => {
  const User = useRecoilValue(userData);
  const [resultData, setResultData] = useRecoilState(resultDataAtom);
  const [showPopup, setShowPopup] = useState(false);
  const [holdData, setHoldData] = useState(null);
  const [loader, setLoader] = useState(false);
  
  const handleDelete = (row) => {
    setShowPopup(true);
    setHoldData(row);
  };
  const {name} = User
  const [Exit,SetExit] = useState(false);
  const confirmDelete = () => {
    if (holdData) {
      setResultData((prevResultData) => {
        const filteredData = prevResultData.filter(
          (item) => item.sNo !== holdData.sNo
        );
        const modifiedData = filteredData.map((data, index) => ({
          ...data,
          sNo: index + 1,
        }));
        return modifiedData;
      });
      setShowPopup(false);
      setHoldData(null);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setHoldData(null);
  };

  const downloadPDF = () => {
    const capture = document.querySelector(".receipt-table");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("l", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
    });
  };
  const handleExit = ()=>
  {
    window.location.href = 'https://tneachoicelist.com/';
  }
  const handleNotExit = ()=>
  {
      SetExit(false);
  }
  const selectedComumunityCutOff = (row) => {
    switch (User.community) {
      case "bc":
        return row.bc;
      case "sc":
        return row.sc;
      case "sca":
        return row.sca;
      case "mbc":
        return row.mbc;
      case "oc":
        return row.oc;
      case "bcm":
        return row.bcm;
      case "st":
        return row.st;
      default:
        return "";
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedResultData = Array.from(resultData);
    const [movedItem] = reorderedResultData.splice(result.source.index, 1);
    reorderedResultData.splice(result.destination.index, 0, movedItem);
    const modifiedData = reorderedResultData.map((data, index) => ({
      ...data,
      sNo: index + 1,
    }));
    setResultData(modifiedData);
  };

  function capitalizeFirstLetter(str) {
    if (str.length === 0) {
      return str; // Return an empty string as is
    }

    // Convert the first letter to uppercase
    let firstLetter = str.charAt(0).toUpperCase();

    // Get the rest of the string
    let restOfString = str.slice(1);

    // Combine the uppercase first letter with the rest of the string
    return firstLetter + restOfString;
  }

  return (
    <div className="m-5 sm:m-10 min-h-screen">
      {showPopup && (
        <AlertPopup onCancel={cancelDelete} onAccept={confirmDelete} />
      )}
      {/* {
        (
          Exit && (
            <ExitPopup 
            name={name}
            onCancel = {handleNotExit} onAccept={handleExit} />
          )
        )
      } */}
      <div className="flex items-center justify-between gap-10">
        <div>
          <Link to="/home">
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2 mx-6">
              <FaHome />
              <p className="pl-2">BACK</p>
            </div>
          </Link>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2 mx-6"
            onClick={() => window.print()}
          >
            <IoIosPrint />
            <p className="pl-2">PRINT</p>
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2 mx-6"
            // onClick={() => window.print()}
          >
            <BiExport />
            <p className="pl-2"
            > Export</p>
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2 mx-6"
            // onClick={() => window.print()}
          >
            <CgImport />
            <p className="pl-2"
            > Import</p>
          </button>
        </div>
        <a href="https://tneachoicelist.com/">
        <button 
          onClick={()=> SetExit(true)}
          className="bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2 mx-6">
            <IoMdExit size={18} />
            <p className="pl-2">EXIT</p>
          </button>
        </a>
          
        
        {/* <button
          className="receipt-modal-download-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2"
          onClick={downloadPDF}
          disabled={loader}
        >
          {loader ? (
            <span><MdDownloading /></span>
          ) : (
            <span><FaDownload /></span>
          )}
        </button> */}
      </div>
      {/* <Disclaimer></Disclaimer> */}
      <div className="text-center font-bold text-xl my-2">
        Welcome {capitalizeFirstLetter(User.name) || "User"}
      </div>
      <div className="text-center font-bold text-base ">
        CutOff: {User.cutOff || "N/A"}
      </div>
      <div className="text-center font-bold text-base ">
        Community: {User.community.toUpperCase() || "User"}
      </div>
      <div className="receipt-table">
        {resultData.length === 0 ? (
          <span className="text-red-500">No Colleges selected</span>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <table
                  className="min-w-full divide-y divide-gray-200 mx-2 sm:mx-5 m-10 border border-spacing-1 border-gray-300"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
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
                      {/* <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                        {User.community}
                      </th> */}
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                        Drop
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resultData.map((row, index) => (
                      <Draggable
                        key={row.sNo}
                        draggableId={`${row.sNo}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${
                              snapshot.isDragging ? "bg-blue-200" : "bg-white"
                            } hover:bg-blue-200 focus:bg-red-500 active:bg-blue-500 transition-colors duration-100 ease-in-out cursor-pointer`}
                          >
                            <td className="px-3 py-4 whitespace-nowrap">
                              {row.sNo}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              {row.region}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              {row.collegeCode}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              {row.name}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              {row.branchCode}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              {row["Branch Name"]}
                            </td>
                            {/* <td className="px-3 py-4 whitespace-nowrap">
                              {selectedComumunityCutOff(row)}
                            </td> */}
                            <td className="px-3 py-4 whitespace-nowrap">
                              <MdDelete
                                onClick={() => handleDelete(row)}
                                className="text-red-500 cursor-pointer"
                              />
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
      <Disclaimer></Disclaimer>
    </div>
  );
};

export default Result;
