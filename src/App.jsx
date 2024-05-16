import React from "react";
import Home from "./pages/Home";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Home></Home>
      </RecoilRoot>
    </div>
  );
};

export default App;
