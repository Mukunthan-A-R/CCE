import React from "react";
import ResultPage from "./ResultPage";

const Test = () => {
  const saveAsHtml = () => {
    // Content you want to save as HTML
    const htmlContent = { ResultPage };

    // Create a Blob containing the HTML content
    const blob = new Blob([htmlContent], { type: "text/html" });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");

    // Set link's attributes
    link.href = url;
    link.download = "example.html"; // File name

    // Append the link to the body
    document.body.appendChild(link);

    // Click the link programmatically to trigger the download
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={saveAsHtml}>Save as HTML</button>
    </div>
  );
};

export default Test;
