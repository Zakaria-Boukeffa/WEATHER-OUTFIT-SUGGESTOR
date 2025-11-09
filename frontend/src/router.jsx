import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Suggestion from "./pages/Suggestion";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/suggestion",
    element: <Suggestion />,
  },
]);
