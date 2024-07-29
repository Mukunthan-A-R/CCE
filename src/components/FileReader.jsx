import { useState } from "react";
import { resultArray as resultDataAtom, userData } from "../data/atoms";
import { useRecoilState } from "recoil";

const FileReader = () => {
  const [jsonData, setJsonData] = useState(null);
  const [resultData, setResultData] = useRecoilState(resultDataAtom);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setJsonData(json);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
    setResultData(jsonData.result)
    console.log(jsonData);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      {jsonData && (
        <div>
          <h3>JSON Data:</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileReader;