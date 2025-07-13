import { atom } from "recoil";

export const resultArray = atom({
  key: "resultArray",
  default: [],
});

export const userData = atom({
  key: "userData",
  default: {
    name: "",
    email: "",
    phoneNo: "",
    cutOff: "",
    community: "oc",
    expertPermission: "",
    expertId:""
  },
});

export const sno = atom({
  key: "SNO",
  default: 1,
});


export const expertDetails = atom({
  key: "expertDetails",
  default:{
    
    email:"",
    password:"",
    
  }
})
