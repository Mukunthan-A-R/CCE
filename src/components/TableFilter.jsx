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
import InputDept from './InputDept';
import {toast,ToastContainer} from "react-toastify"

const TableFilter = () => {
  const [data,setData] = useState([...TableValues]); 

  // COPY VALUE TO MAKE RESTORE TO ORIGINAL STATE
  const [TableValuesCopy,setTableValuesCopy] = useState([...TableValues]);
  
  const [filter,setFilter] = useState({
        cutOffStart: 200,
        cutOffEnd: 0,
        collegeCode: 0,
        region: "",
        dept:[],
    })

    const [errors,SetErrors] = useState({})

    const handleDataCutOffSt = (value) => {
      let newErrors = {};

      if(value > 0 && value <= 200)
      {
        setFilter({...filter ,cutOffStart: parseInt(value)})
        console.log(filter);
      }
        
        if(value === ""){
          setFilter({...filter ,cutOffStart: 200})
        }
        if(value > 200 )
        {
          newErrors.cutOffStart = "Cut off value starting should be between 1 and 200";
          
        }
        if(value < 0)
        {
          newErrors.cutOffStart = "Cut off value should not less than 0";
        }
        SetErrors((prev)=> ({...prev,...newErrors}))
    }
    
    const handleDataCutOffEnd = (value) => {
      let newErrors = {};

      if(value > 200)
        {
          newErrors.cutOffEnd = "the cut off value should be between 1 and 200"
        
        }
        if(value < 0)
        {
          newErrors.cutOffEnd = "the cut off value should be greater than 0"
        }
        if(value > 0 && value <=200)
        {
          setFilter({...filter ,cutOffEnd: parseInt(value)})
          console.log(filter);
        }
       
        if(value === ""){
          setFilter({...filter ,cutOffEnd: 0})
        }
        SetErrors((prev)=> ({...prev,...newErrors}))
    }

    const handleDataCollegeCode = (value) => {
       let newErrors = {}
        if(value === ""){
          setFilter({...filter , collegeCode: 0})
        }
        if(value > 0 && value <= 3000)
        {
          setFilter({...filter ,collegeCode: parseInt(value)})
        
        console.log(filter);
        }
        if(value < 0 || value > 3000)
        {
            newErrors.collegeCode = "The college code should be between 1 and 3000"
        }
        SetErrors((prev)=> ({...prev,...newErrors}))
      
    }

    const handleDataRegion = (e) => {
        setFilter({...filter ,region: e.target.value})
        console.log(filter);
    }
    const handleDataDept = (selectedValues) => {
      console.log("Selected values in handleDataDept:", selectedValues); // Log selected values for debugging
      setFilter((prevFilter) => ({ ...prevFilter, dept: selectedValues }));
    };
  
    
    useEffect(() => {
      console.log("Updated filter state:", filter);
    }, [filter]);

    const handleSubmit = () => {
      if(Object.keys(errors).length > 0)
      {
        console.log('Form Contains errors');
        return;
      }
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
            error = {errors.cutOffStart}

            type="number"
            styles="w-full md:w-1/2 px-10 my-4 "
          ></InputComponent>
          
          <InputComponent
            //CutOff data
            sendData={handleDataCutOffEnd}
            label="Cut Off Ending"
            type="number"
            styles="w-full md:w-1/2 px-10 my-4 "
            error={errors.cutOffEnd}
          ></InputComponent>
        </div>

        <div className="md:flex">
          <InputComponent
            //College Code
            sendData={handleDataCollegeCode}
            label="College Code"
            error={errors.collegeCode}
            type="number"
            styles="w-full md:w-1/2 px-10 my-4 "
          ></InputComponent>
          <InputRegion
          label="Region"
          styles="w-full md:w-1/2 px-10 my-4 "
          sendData={handleDataRegion}
          ></InputRegion>
          
        </div>
        <InputDept
          label="Department"
          styles="w-full md:w-1/2 px-10 my-4"
          sendData={handleDataDept}
          />
         
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