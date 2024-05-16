import { atom } from "recoil";

const resultArray = atom({
  key: "textState",
  default: [
    {
      sNo: 5,
      region: "Chennai",
      collegeCode: "MNO654",
      name: "Vellore Institute of Technology",
      branchCode: "BC005",
      branchName: "Chemical Engineering",
      oc: 84,
      bc: 35.2,
      bcm: 30.4,
      mbc: 40.2,
    },
  ],
});

export default resultArray;
