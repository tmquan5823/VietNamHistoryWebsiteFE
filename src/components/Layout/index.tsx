import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./Header";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default Layout;
