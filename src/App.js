import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import HomePage, {
  loader as popsLoader,
  action as popsSwapAction,
} from "./pages/Home";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
// import GuidePage, { loader as guidesLoader } from "./pages/Guide";
import LoginPage, { action as loginAction } from "./pages/Login";
import LogoutPage from "./pages/Logout";
import MenuPage from "./pages/menu/Menu";
import { getLoggedUser } from "./utils/token";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: popsLoader,
        action: popsSwapAction,
      },
      // {
      //   path: "guide",
      //   element: <GuidePage />,
      //   loader: guidesLoader,
      // },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "logout",
        element: <LogoutPage />,
      },
      {
        path: "menu",
        element: <OnlyForAdmin />,
        children: [{ index: true, element: <MenuPage /> }],
      },
    ],
  },
]);

function OnlyForAdmin() {
  const user = getLoggedUser();

  if (user && user.type === "admin") return <Outlet />;

  return <Navigate to={"/"} replace={true} />;
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
