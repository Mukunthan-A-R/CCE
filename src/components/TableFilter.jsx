import React, { useEffect, useState } from 'react'
import TableValues from '../data/DataChennai';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import { useRecoilState } from 'recoil';
import { resultArray, userCommunity, userValue } from '../data/atoms';
import DataSubmitted from './DataSubmitted';
import { useNavigate } from 'react-router-dom';
import TableWithSort from './TableWithSort';
import InputRegion from './InputRegion';

const TableFilter = () => {
  const [data,setData] = useState([...TableValues]); 

  // COPY VALUE TO MAKE RESTORE TO ORIGINAL STATE
  const [TableValuesCopy,setTableValuesCopy] = useState([...TableValues]);
  
  const [filter,setFilter] = useState({
        cutOffStart: 200,
        cutOffEnd: 0,
        collegeCode: 0,
        region: "",
        dept:"",
    })


    const handleDataCutOffSt = (value) => {
        setFilter({...filter ,cutOffStart: parseInt(value)})
        console.log(filter);
        if(value === ""){
          setFilter({...filter ,cutOffStart: 200})
        }
    }
    
    const handleDataCutOffEnd = (value) => {
        setFilter({...filter ,cutOffEnd: parseInt(value)})
        console.log(filter);
        if(value === ""){
          setFilter({...filter ,cutOffEnd: 0})
        }
    }

    const handleDataCollegeCode = (value) => {
        setFilter({...filter ,collegeCode: parseInt(value)})
        console.log(filter);
        if(value === ""){
          setFilter({...filter , collegeCode: 0})
        }
      
    }

    const handleDataRegion = (e) => {
        setFilter({...filter ,region: e.target.value})
        console.log(filter);
    }

    const handleSubmit = () => {
        console.log("HELLO");
        const FilterData =  TableValues.filter(value => value.oc <= filter.cutOffStart && value.oc >= filter.cutOffEnd   &&
          (filter.region === "" || value.region.toLowerCase() === filter.region.toLowerCase())
        )
        setData(FilterData)
        if(filter.collegeCode !== 0){
          setData(FilterData.filter(value =>  filter.collegeCode === parseInt(value.collegeCode) ))
        }
        console.log(filter);
      }

      // &&       (filter.collegeCode !== 0 && value.collegeCode === filter.collegeCode)

      // {const FinalData = FilterData.filter(value => value.collegeCode === filter.collegeCode)}
      // && value.collegeCode === filter.collegeCode 
 
  return (
    <div className="my-0">
      <div className="border border-gray-200 rounded-lg mx-10 shadow-lg">
        
        <div className="md:flex">
          <InputComponent
            //CutOff data
            sendData={handleDataCutOffSt}
            label="Cut Off Starting"
            type="number"
            styles="w-full md:w-1/2 px-10 my-4 "
          ></InputComponent>
          <InputComponent
            //CutOff data
            sendData={handleDataCutOffEnd}
            label="Cut Off Ending"
            type="number"
            styles="w-full md:w-1/2 px-10 my-4 "
          ></InputComponent>
        </div>

        <div className="md:flex">
          <InputComponent
            //College Code
            sendData={handleDataCollegeCode}
            label="College Code"
            type="number"
            styles="w-full md:w-1/2 px-10 my-4 "
          ></InputComponent>
          <InputRegion
          label="Region"
          styles="w-full md:w-1/2 px-10 my-4 "
          sendData={handleDataRegion}
          ></InputRegion>
        </div>
         
        {/* <div className="md:flex">
          <InputComponent
            // Department
            sendData={handleDataDept}
            label="Department"
            type="text"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputComponent>
          <InputComponent
            // Region
            sendData={handleDataRegion}
            label="Region"
            type="text"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputComponent>
        </div>
        <div className="md:flex ">
        </div> */}
      
      </div>
      <div className="flex w-full justify-center">
        <ButtonComponent
          handleClick={handleSubmit}
          styles="mb-10 text-white bg-blue-700 px-5 py-2 mx-5 sm:mx-10 my-5 rounded-md flex justify-center " 
        >
          Submit
        </ButtonComponent>
      </div>
      {/* <TableWithSort tableWithSort data={TableValues} community={"oc"}></TableWithSort> */}
      <TableWithSort tableWithSort data={data} community={"oc"}></TableWithSort>
    </div>
  )
}

export default TableFilter