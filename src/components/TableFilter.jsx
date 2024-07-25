import React, { useEffect, useState } from 'react';
import TableValues from '../data/DataChennai';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import InputRegion from './InputRegion';
import InputDept from './InputDept';
import TableWithSort from './TableWithSort';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { userData } from "../data/atoms";
import { useRecoilValue } from 'recoil';

const TableFilter = () => {
  const { community }= useRecoilValue(userData);
  // console.log("com", community);  
  
  const [data, setData] = useState([...TableValues]);
  console.log("--->", data[0]);
  const [filter, setFilter] = useState({
    cutOffStart: 200,
    cutOffEnd: 0,
    collegeCode: 0,
    region: "",
    dept: [],
  });
  const [errors, SetErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(1); // New state for pagination window
  const pageSize = 50;


  // Filter logic
  const handleSubmit = () => {
    const hasErrors = Object.values(errors).some(error => error.trim() !== '');
    if (hasErrors) {
      console.log('Form Contains errors');
      return;
    }

    let filteredData = data.filter(value => value.oc <= filter.cutOffStart && value.oc >= filter.cutOffEnd &&
      (filter.region === "" || value.region.toLowerCase() === filter.region.toLowerCase())
    );
    
    // college code
    if (filter.collegeCode !== 0) {
      filteredData = filteredData.filter(value => filter.collegeCode === parseInt(value.collegeCode));
    }

    // departments
    if (filter.dept.length !== 0) {
      filteredData = filteredData.filter(value => filter.dept.includes(value.branchCode));
    }

    setData(filteredData);
    setCurrentPage(1); // Reset to the first page after filtering
    setPageWindowStart(1); // Reset the pagination window start
  };

  useEffect(() => {
    let communityFilteredData;
    if (community == "oc") {
      communityFilteredData = data.map((data) => ({
        sNo: data.sNo,
        region: data.region,
        collegeCode: data.collegeCode,
        name: data.name,
        branchCode: data.branchCode,
        branchName: data.branchName,
        oc: data.oc
      }));
    } else {
      communityFilteredData = data.map((data) => ({
        sNo: data.sNo,
        region: data.region,
        collegeCode: data.collegeCode,
        name: data.name,
        branchCode: data.branchCode,
        branchName: data.branchName,
        oc: data.oc,  
        [community]: data[community], // Dynamic key based on the community
      }));
    }
    setData(communityFilteredData);
    console.log("data", communityFilteredData[0]);
  }, []);

  // Pagination logic
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
    for (let i = pageWindowStart; i < pageWindowStart + 3 && i <= totalPages; i++) {
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
          className={`mx-1 p-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 text-black'}`}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`mx-1 p-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 text-black'}`}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TableFilter;
