import { createBrowserRouter } from "react-router-dom";
import InputFilter from "../components/InputFilter";
import ResultPage from "../pages/ResultPage";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  { path: "/", element: <InputFilter /> },
  {
    path: "/app",
    element: (
      <RecoilRoot>
        <ResultPage />
      </RecoilRoot>
    ),
  },
]);

export default router;
