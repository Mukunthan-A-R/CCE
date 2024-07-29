import { useState } from "react";
import { resultArray as resultDataAtom, userData } from "../data/atoms";
import { useRecoilState } from "recoil";

const DemoFileReader = ({ setResultData }) => {
  const [jsonData, setJsonData] = useState(null);
  // const [resultData, setResultData ] = useRecoilState(resultDataAtom);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const jsonData = await readFileAsText(file);
        const parsedData = JSON.parse(jsonData);
        setJsonData(parsedData);
        setResultData (parsedData.result);
        console.log(parsedData);
        await handleSubmit();
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }
  };

  // Helper function to read a file as text
  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }


  return (
    <div className="ml-2">
    <label htmlFor="import-file">Import</label> 
      <input id="import-file" type="file" accept=".json" onChange={handleFileChange} 
        className="file"
      />
    </div>
  );
};

export default DemoFileReader;