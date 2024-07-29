import { useState } from "react";
import { resultArray as resultDataAtom, userData } from "../data/atoms";
import { useRecoilState } from "recoil";

const DemoFileReader = ({ setResultData}) => {
  const [jsonData, setJsonData] = useState(null);
  // const [resultData, setResultData] = useRecoilState(resultDataAtom);

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
    handleSubmit();
  };

  const handleSubmit = ({onSubmit}) => {
    const hasErrors = Object.values(errors).some(
      (error) => error.trim() !== ""
    );
    if (hasErrors) {
      console.log("Form Contains errors");
      return;
    }

    const FilterData = TableValues.filter(
      (value) =>
        value[community] <= filter.cutOffStart &&
        value[community] >= filter.cutOffEnd &&
        (filter.region === "" ||
          value.region.toLowerCase() === filter.region.toLowerCase())
    );

    let filteredData = FilterData;
    if (filter.collegeCode !== 0) {
      filteredData = filteredData.filter(
        (value) => filter.collegeCode === parseInt(value.collegeCode)
      );
    }
    if (filter.dept.length !== 0) {
      filteredData = filteredData.filter((value) => {
        // Check if the department is Self Supporting
        const isSSIncluded =
          filter.dept.includes("SS") &&
          value["Branch Name"].toLowerCase().includes("(ss)");
        // General department filter
        const isDeptIncluded = filter.dept.includes(value.branchCode);

        return isDeptIncluded || isSSIncluded;
      });
    }
    // setData(filteredData);
    // setCurrentPage(1); // Reset to the first page after filtering
    onSubmit("update key");
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      {/* {jsonData && (
        <div>
          <h3>JSON Data:</h3>
          <pre>{JSON.stringify(jsonData.name, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default DemoFileReader;