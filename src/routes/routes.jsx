import { createBrowserRouter } from "react-router-dom";
import { Register, Home, Result, Test, Analytics } from "../pages";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Register /> 
  },
  { 
    path: "/home", 
    element: <Home /> 
  },
  {
    path: "/result",
    element: <Result />,
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
