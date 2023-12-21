import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContextProvider } from "../store/authUserContext";

const RootLayout = () => {
  return (
    <>
      <UserContextProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </UserContextProvider>
    </>
  );
};

export default RootLayout;
