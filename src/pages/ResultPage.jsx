import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { resultArray, userValue } from "../data/atoms";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import { MdDelete } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResultPage = () => {
  const value = useRecoilValue(resultArray);
  const [resultData, setResultData] = useRecoilState(resultArray);
  const [userData, setUserData] = useRecoilState(userValue);
  console.log(value);

  const handleDelete = (row) => {
    setResultData(resultData.filter((item) => item.sNo !== row.sNo));

    // resultData.filter((item) => item.id != row.sNo)
  };
  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector(".recipt-table");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
    });
  };
  return (
    <div className="m-5 sm:m-10">
      <Link to="/">
        <FaHome size={25} />
      </Link>
      <div className="text-center font-bold text-2xl my-5">
        Welcome {userData.name === "" ? "User" : userData.name}
      </div>
      <div className="recipt-table">
        {value.length === 0 ? (
          <span className="text-red-500">No Colleges selected</span>
        ) : (
          <table className="min-w-full  divide-y divide-gray-200 mx-2 sm:mx-5 m-10">
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

      {/* receipt action */}
      <button
        className="receipt-modal-download-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2"
        onClick={downloadPDF}
        disabled={!(loader === false)}
      >
        {loader ? <span>Downloading</span> : <span>Download</span>}
      </button>
    </div>
  );
};

export default ResultPage;
