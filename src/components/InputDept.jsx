import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const InputDept = ({ label, styles, sendData }) => {
  const options = [
    { label: "Computer Science and Engineering", value: "CS" },
    { label: "Information Technology", value: "IT" },
    { label: "Computer and Communication Engineering", value: "CO" },
    { label: "Artificial Intelligence and Data Science", value: "AD" },
    { label: "Computer and Communication Engineering", value: "CO" },
    { label: "Electronics and Communication Engineering", value: "EC" },
    {
      label:
        "Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
      value: "AM",
    },
    { label: "Computer Science and Business System", value: "CB" },
    {
      label: "M.Tech. Computer Science and Engineering (Integrated 5 years)",
      value: "CJ",
    },
    {
      label: "Computer Science and Engineering (Internet of Things)",
      value: "CI",
    },
    { label: "Electrical and Electronics Engineering", value: "EE" },
    { label: "Electronics and Instrumentation Engineering", value: "EI" },
    { label: "Mechanical Engineering", value: "ME" },
    {
      label: "Electronic Instrumentation and Control Engineering",
      value: "IX",
    },
    { label: "Civil Engineering", value: "CE" },
    { label: "Mechanical and Automation Engineering", value: "MU" },
    { label: "Computer Science and Engineering (Cyber Security)", value: "SC" },
<<<<<<< HEAD
    { label:"Self Supporting Courses (SS)",value:"SS"},
   
=======
>>>>>>> 0b62c803fc071f4971f1f0f318a674b68c2277e5
  ];

  const [selected, setSelected] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelected(selectedOptions);
<<<<<<< HEAD
    sendData(selectedOptions.map((val)=> val.value)); // Call sendData with the selected options
    console.log(selected)
=======
    sendData(selectedOptions.map((val) => val.value)); // Call sendData with the selected options
>>>>>>> 0b62c803fc071f4971f1f0f318a674b68c2277e5
  };

  return (
    <div className={styles}>
      <label htmlFor={label} className="mx-2 text-lg font-medium">
        {label}
        <br />
      </label>
      <MultiSelect
        className="multi-select"
        options={options}
        value={selected}
        onChange={handleChange}
        labelledBy="Select"
      />
    </div>
  );
};

export default InputDept;
