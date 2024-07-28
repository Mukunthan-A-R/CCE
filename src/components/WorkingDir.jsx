import React from "react";
import CollegePDF from "../assets/CollegeList.pdf";

const WorkingDir = () => {
  return (
    <div>
      <a
        className="sm:px-10 text-blue-900 font-medium"
        href={CollegePDF}
        download="CollegeList.pdf"
      >
        College List Download
      </a>
    </div>
  );
};

export default WorkingDir;
