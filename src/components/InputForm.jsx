import React, { useState } from "react";

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sNo: "",
    region: "",
    collegeCode: "",
    name: "",
    branchCode: "",
    branchName: "",
    oc: "",
    bc: "",
    bcm: "",
    mbc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      sNo: "",
      region: "",
      collegeCode: "",
      name: "",
      branchCode: "",
      branchName: "",
      oc: "",
      bc: "",
      bcm: "",
      mbc: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">
            <span className="text-gray-700">S.No:</span>
            <input
              type="text"
              name="sNo"
              value={formData.sNo}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="text-gray-700">Region:</span>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
            />
          </label>
        </div>
        {/* Add similar div blocks for other input fields */}
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default InputForm;
