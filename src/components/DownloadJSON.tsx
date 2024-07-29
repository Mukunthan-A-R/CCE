import React from 'react';
import { BiExport } from "react-icons/bi";

const DownloadJSON = ({ data, fileName ,style}) => {
  const handleDownload = () => {
    // Convert the JavaScript object to a JSON string
    const jsonString = JSON.stringify(data, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and set its download attribute
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    // Append the link to the body (required for Firefox)
    document.body.appendChild(a);

    // Simulate a click to download the file
    a.click();

    // Remove the link from the body
    document.body.removeChild(a);

    // Release the object URL
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} className={`download-button gap-2 flex items-center ${style}`}>
        <BiExport />
      Export
    </button>
  );
};

export default DownloadJSON;