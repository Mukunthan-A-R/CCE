import React, { useEffect, useState } from "react";
import TableValues from "../data/DataChennai";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import InputRegion from "./InputRegion";
import InputDept from "./InputDept";
import TableWithSort from "./TableWithSort";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { userData } from "../data/atoms";
import { useRecoilValue } from "recoil";

const TableFilter = () => {
  const { community } = useRecoilValue(userData);

  const [data, setData] = useState([...TableValues]);
  const [filter, setFilter] = useState({
    cutOffStart: 200,
    cutOffEnd: 0,
    collegeCode: 0,
    region: "",
    dept: [],
  });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(1);
  const pageSize = 50;

  const handleDataCutOffSt = (value) => {
    let newErrors = {};

    if (value > 0 && value <= 200) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        cutOffStart: parseInt(value),
      }));
      newErrors.cutOffStart = "";
    } else if (value === "") {
      setFilter((prevFilter) => ({ ...prevFilter, cutOffStart: 200 }));
    } else if (value > 200) {
      newErrors.cutOffStart =
        "Cut off value starting should be between 1 and 200";
    } else if (value < 0) {
      newErrors.cutOffStart = "Cut off value should not be less than 0";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  const handleDataCutOffEnd = (value) => {
    let newErrors = {};

    if (value > 200) {
      newErrors.cutOffEnd = "The cut off value should be between 1 and 200";
    } else if (value < 0) {
      newErrors.cutOffEnd = "The cut off value should be greater than 0";
    } else if (value > 0 && value <= 200) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        cutOffEnd: parseInt(value),
      }));
      newErrors.cutOffEnd = "";
    } else if (value === "") {
      setFilter((prevFilter) => ({ ...prevFilter, cutOffEnd: 0 }));
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  const handleDataCollegeCode = (value) => {
    const intValue = parseInt(value);
    let newErrors = {};

    if (value === "") {
      setFilter((prevFilter) => ({ ...prevFilter, collegeCode: 0 }));
      newErrors.collegeCode = "";
    } else if (isNaN(intValue)) {
      newErrors.collegeCode = "College Code must be a number";
    } else if (intValue <= 0 || intValue > 3000) {
      newErrors.collegeCode = "The college code should be between 1 and 3000";
    } else {
      setFilter((prevFilter) => ({ ...prevFilter, collegeCode: intValue }));
      newErrors.collegeCode = "";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  const handleDataRegion = (e) => {
    setFilter((prevFilter) => ({ ...prevFilter, region: e.target.value }));
  };

  const handleDataDept = (selectedValues) => {
    setFilter((prevFilter) => ({ ...prevFilter, dept: selectedValues }));
  };

  const handleSubmit = () => {
    const hasErrors = Object.values(errors).some(
      (error) => error.trim() !== ""
    );
    if (hasErrors) {
      console.log("Form contains errors");
      return;
    }

    // Initial filter based on cutOffStart, cutOffEnd, and region
    let filteredData = data.filter(
      (value) =>
        value.oc <= filter.cutOffStart &&
        value.oc >= filter.cutOffEnd &&
        (filter.region === "" ||
          (typeof filter.region === "string" &&
            value.region.toLowerCase() === filter.region.toLowerCase()))
    );

    // Additional filter based on collegeCode
    if (filter.collegeCode !== 0) {
      filteredData = filteredData.filter(
        (value) => filter.collegeCode === parseInt(value.collegeCode)
      );
    }

    // Additional filter based on department
    if (filter.dept.length !== 0) {
      filteredData = filteredData.filter((value) =>
        filter.dept.includes(value.branchCode)
      );
    }

    // Set the filtered data to state
    setData(filteredData);
    setCurrentPage(1); // Reset to the first page after filtering
    setPageWindowStart(1); // Reset the pagination window start
  };

  useEffect(() => {
    let communityFilteredData;
    if (community === "oc") {
      communityFilteredData = TableValues.map((data) => ({
        sNo: data.sNo,
        region: data.region,
        collegeCode: data.collegeCode,
        name: data.name,
        branchCode: data.branchCode,
        branchName: data.branchName,
        oc: data.oc,
      }));
    } else {
      communityFilteredData = TableValues.map((data) => ({
        sNo: data.sNo,
        region: data.region,
        collegeCode: data.collegeCode,
        name: data.name,
        branchCode: data.branchCode,
        branchName: data.branchName,
        oc: data.oc,
        [community]: data[community],
      }));
    }
    setData(communityFilteredData);
  }, [community]);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (currentPage >= pageWindowStart + 2) {
        setPageWindowStart(pageWindowStart + 3);
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage <= pageWindowStart) {
        setPageWindowStart(pageWindowStart - 3);
      }
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (
      let i = pageWindowStart;
      i < pageWindowStart + 3 && i <= totalPages;
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="my-0">
      <div className="border border-gray-200 rounded-lg mx-10 shadow-lg">
        <div className="md:flex">
          <InputComponent
            sendData={(value) => handleDataCutOffSt(value)}
            label="Cut Off Starting"
            error={errors.cutOffStart}
            type="number"
            styles="w-full md:w-1/2 px-10 my-4"
          />
          <InputComponent
            sendData={(value) => handleDataCutOffEnd(value)}
            label="Cut Off Ending"
            type="number"
            styles="w-full md:w-1/2 px-10 my-4"
            error={errors.cutOffEnd}
          />
        </div>
        <div className="md:flex">
          <InputComponent
            sendData={(value) => handleDataCollegeCode(value)}
            label="College Code"
            error={errors.collegeCode}
            type="number"
            styles="w-full md:w-1/2 px-10 my-4"
          />
          <InputRegion
            label="Region"
            styles="w-full md:w-1/2 px-10 my-4"
            sendData={(e) => handleDataRegion(e)}
          />
        </div>
        <InputDept
          label="Department"
          styles="w-full md:w-1/2 px-10 my-4"
          sendData={(selectedValues) => handleDataDept(selectedValues)}
        />
      </div>
      <div className="flex w-full justify-center">
        <ButtonComponent
          handleClick={handleSubmit}
          styles="mb-10 text-white bg-blue-700 px-5 py-2 mx-5 sm:mx-10 my-5 rounded-md flex justify-center"
        >
          Submit
        </ButtonComponent>
      </div>
      <TableWithSort data={paginatedData} community={community} />
      <div className="flex items-center justify-center my-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`mx-1 p-2 rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400"
              : "bg-gray-200 text-black"
          }`}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`mx-1 p-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400"
              : "bg-gray-200 text-black"
          }`}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TableFilter;
