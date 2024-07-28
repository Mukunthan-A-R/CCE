import { createBrowserRouter } from "react-router-dom";
import { Register, StaffRegister, Home, Result, Test, Analytics } from "../pages";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Register /> 
  },
  { 
    path: "/staff-register", 
    element: <StaffRegister /> 
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
