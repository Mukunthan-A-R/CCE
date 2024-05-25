import { createBrowserRouter } from "react-router-dom";
import InputFilter from "../components/InputFilter";
import ResultPage from "../pages/ResultPage";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Analytics from "../pages/Analytics";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/app",
    element: <ResultPage />,
  },
  {
    path: "/data",
    element: <Analytics />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

export default router;
