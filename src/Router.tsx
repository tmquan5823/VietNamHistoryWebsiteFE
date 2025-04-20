import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { ROUTERS } from "./constant";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ImageRestoration from "./pages/ImageRestoration";

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTERS.DEFAULT} element={<Home />} />
        <Route path={ROUTERS.HOME} element={<Home />} />
        <Route path={ROUTERS.LOGIN} element={<Login />} />
        <Route path={ROUTERS.IMAGE_RESTORATION} element={<ImageRestoration />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
