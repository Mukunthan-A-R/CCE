import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

const InputDept = ({ label, styles, sendData }) => {
  const options = [
    { label: "Computer Science and Engineering", value: "CS" },
    { label: "Information Technology", value: "IT" },
    { label: "Artificial Intelligence and Data Science", value: "AD" },
    { label: "Electronics and Communication Engineering", value: "EC" },
    { label: "Computer Science and Engineering (Artificial Intelligence and Machine Learning)", value: "AM" },
    { label: "Computer Science and Business System", value: "CB" },
    { label: "M.Tech. Computer Science and Engineering (Integrated 5 years)", value: "CJ" },
    { label: "Computer Science and Engineering (Internet of Things)", value: "CI" },
    { label: "Electrical and Electronics Engineering", value: "EE" },
    { label: "Electronics and Instrumentation Engineering", value: "EI" },
    { label: "Mechanical Engineering", value: "ME" },
    { label: "Electronic Instrumentation and Control Engineering", value: "IX" },
    { label: "Civil Engineering", value: "CE" },
    { label: "Mechanical and Automation Engineering", value: "MU" },
    { label: "Computer Science and Engineering (Cyber Security)", value: "SC" },
    { label: "Computer and Communication Engineering", value: "CO" },
  ];

  const [selected, setSelected] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelected(selectedOptions);
    sendData(selectedOptions.map((val)=> val.value)); // Call sendData with the selected options
  };

  return (
    <div className={styles}>
      <label htmlFor={label} className="mx-2 text-lg font-medium">
        {label}
        <br />
      </label>
      <MultiSelect
        options={options}
        value={selected}
        onChange={handleChange}
        labelledBy="Select"
        
      />
    </div>
  );
};

export default InputDept;
