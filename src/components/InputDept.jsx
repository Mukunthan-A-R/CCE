import React from 'react'

const InputDept = ({label,styles,sendData}) => {
    const handleChange = (event) => {
        sendData(event.target.value);
        console.log(event.target.value);
      };
  return (
    <div className={styles}>
      <label
      htmlFor={label}
      className='mx-2 text-lg font-medium'
      >
        {label}
        <br />
        <select
        id={label}
        onChange={handleChange}
        className="w-full border bg-[#deebfa] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      >
        <option value="">Select...</option>
        <option value="Chennai">Chennai zone</option>
        <option value="Coimbatore">Coimbatore</option>
        <option value="Tanjore">Tanjore zone</option>
        <option value="Madurai">Madurai zone</option>
        <option value="Trichy">Trichy zone</option>
        <option value="others">others</option>
        <option value=""></option>
      </select>
      </label>
    </div>
  )
}

export default InputDept
