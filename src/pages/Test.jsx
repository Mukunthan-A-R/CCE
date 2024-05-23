import React, { useState, useEffect } from "react";

function Component() {
  const [showPopup, setShowPopup] = useState(false);

  // Function to handle the action that triggers the popup
  const handleTriggerPopup = () => {
    // Set showPopup to true when the condition is triggered
    setShowPopup(true);
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    // Set showPopup to false to hide the popup
    setShowPopup(false);
  };

  useEffect(() => {
    // Close the popup after 3 seconds
    const timeoutId = setTimeout(() => {
      handleClosePopup();
    }, 3000);

    // Cleanup the timeout when component unmounts or when showPopup changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showPopup]);

  return (
    <div>
      {/* Button or element to trigger the popup */}
      <button onClick={handleTriggerPopup}>Trigger Popup</button>

      {/* Conditionally render the popup based on the state */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <div className="fixed inset-0 bg-black opacity-50"></div>

          {/* Popup content */}
          <div className="bg-white rounded-lg p-6 shadow-xl z-50">
            <h2 className="text-lg font-semibold mb-4">Popup Title</h2>
            <p className="text-gray-600">Popup content goes here...</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Component;
