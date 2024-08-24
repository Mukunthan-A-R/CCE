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
  },
});

export const sno = atom({
  key: "SNO",
  default: 1,
});
