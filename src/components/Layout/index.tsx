import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./Header";
import Footer from "./Footer/Footer";
import Taskbar from "./Taskbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Taskbar />
      <main className="flex-grow bg-white">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default Layout;
