import { createBrowserRouter } from "react-router-dom";
import InputFilter from "../components/InputFilter";
import ResultPage from "../pages/ResultPage";
import Test from "../pages/Test";

const router = createBrowserRouter([
  { path: "/", element: <InputFilter /> },
  {
    path: "/app",
    element: <ResultPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

export default router;
