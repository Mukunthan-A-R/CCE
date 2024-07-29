import React from "react";

const DownloadButton = ({ data, fileName }) => {
  const handleDownload = () => {
    // Convert the JavaScript object to a JSON string
    const jsonString = JSON.stringify(data, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and set its download attribute
    const a = document.createElement("a");
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
    <button onClick={handleDownload} className="download-button">
      Download JSON
    </button>
  );
};

// Example usage
const App = () => {
  const data = {
    name: "John Doe",
    age: 30,
    profession: "Software Developer",
  };

  return (
    <div>
      <h1>Download JSON Example</h1>
      <DownloadButton data={data} fileName="data.json" />
    </div>
  );
};

export default App;
