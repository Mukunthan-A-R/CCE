import { createBrowserRouter } from "react-router-dom";
import { Register, Home, Result, Test, Analytics, DemoFileReader } from "../pages";
import DownloadButton from "../pages/DownloadButton";

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
  {
    path: "/file-reader",
    element: <DemoFileReader />,
  },
  {
    path: "/file-downloader",
    element: <DownloadButton />,
  },
]);

export default router;
