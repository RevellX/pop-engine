import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import PopsPage, {
  loader as popsLoader,
  action as popsSwapAction,
} from "./pages/Pops";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
// import GuidePage, { loader as guidesLoader } from "./pages/Guide";
import LoginPage, { action as loginAction } from "./pages/Login";
import LogoutPage from "./pages/Logout";
import HomePage from "./pages/Home";
import FinancePage from "./pages/Finance";
import TogglePage from "./components/pops/Toggle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "pops",
        children: [
          {
            index: true,
            loader: popsLoader,
            action: popsSwapAction,
            element: <PopsPage />,
          },
          { path: "toggle", element: <TogglePage /> },
        ],
      },
      {
        path: "finance",
        element: <FinancePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "logout",
        element: <LogoutPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
