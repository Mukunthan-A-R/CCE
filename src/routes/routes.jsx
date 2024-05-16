import { createBrowserRouter } from "react-router-dom";
import InputFilter from "../components/InputFilter";
import ResultPage from "../pages/ResultPage";

const router = createBrowserRouter([
  { path: "/", element: <InputFilter /> },
  {
    path: "/app",
    element: <ResultPage />,
  },
]);

export default router;
