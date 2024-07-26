import React from 'react'

const InputRegion = ({styles,label,sendData}) => {
    
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
      onChange={sendData}
      className="w-full border bg-[#deebfa] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    >
      <option value="">Select...</option>
      <option value="Chennai">Chennai zone</option>
      <option value="Coimbatore">Coimbatore</option>
      <option value="Thanjavur">Tanjore zone</option>
      <option value="Madurai">Madurai zone</option>
      <option value="Erode">Erode</option>
      <option value="Trichy">Trichy zone</option>
      <option value="">others</option>
    </select>
    </label>
  </div>
  )
}

export default InputRegion