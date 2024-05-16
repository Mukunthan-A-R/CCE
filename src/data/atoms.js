import { atom } from "recoil";

export const resultArray = atom({
  key: "resultArray",
  default: [],
});

export const userValue = atom({
  key: "userValue",
  default: {
    name: "",
    email: "",
  },
});
