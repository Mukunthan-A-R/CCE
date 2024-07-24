import React, { useEffect, useState } from 'react'
import TableValues from '../data/DataChennai';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import { useRecoilState } from 'recoil';
import { userCommunity, userValue } from '../data/atoms';
import DataSubmitted from './DataSubmitted';
import { useNavigate } from 'react-router-dom';
import TableWithSort from './TableWithSort';
import InputRegion from './InputRegion';

const TableFilter = () => {
    const [filter,setFilter] = useState({
        cutOffStart: 200,
        cutOffEnd: 0,
        region: "",
        dept:"",
    })

    const handleDataCutOffSt = (value) => {
      
        setFilter({...filter ,cutOffStart: value})
        console.log(filter);
    }
    
    const handleDataCutOffEnd = (value) => {
      if(filter.cutOffStart >= value)
      {
        console.log("the end cutoff value should be greater than start cut off value ")
      }
        else if(filter.cutOffStart < value)
        {
          setFilter({...filter ,cutOffEnd: value})
        console.log(filter);
        }
    }
    const handleDept = (event) => {
        setFilter({...filter,region:event.target.value});
        console.log(event.target.value);
      };

    const handleSubmit = () => {
        console.log(filter);

    }
 
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
            // Department
            sendData={handleDept}
            label="Department"
            type="text"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputComponent>
          <InputRegion
            // Region
           /*  sendData={handleDataRegion} */
            label="Region"
            type="text"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputRegion>
        </div>
        <div className="md:flex ">
        </div>
      
      </div>
      <div className="flex w-full justify-center">
        <ButtonComponent
          handleClick={handleSubmit}
          styles="mb-10 text-white bg-blue-700 px-5 py-2 mx-5 sm:mx-10 my-5 rounded-md flex justify-center " 
        >
          Submit
        </ButtonComponent>
  
      </div>
      <TableWithSort tableWithSort data={TableValues} community={"oc"}></TableWithSort>
    </div>
  )
}

export default TableFilter