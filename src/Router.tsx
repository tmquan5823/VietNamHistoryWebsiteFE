import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { ROUTERS } from "./constant";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ImageRestoration from "./pages/ImageRestoration";
import { useUserStore } from "./store/useUserStore";
import { Suspense } from "react";
import HistoryDocument from "./pages/HistoryDocument";
import HistoryDocumentDetail from "./pages/HistoryDocumentDetail";

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="size-12 animate-spin rounded-full border-y-2 border-blue-500"></div>
  </div>
);

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserStore();
  return isAuthenticated ? <>{children}</> : <Navigate to={ROUTERS.LOGIN} />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserStore();
  return isAuthenticated ? (
    <Navigate to={ROUTERS.HOME} />
  ) : (
    <>{children}</>
  );
};

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTERS.DEFAULT} element={<Home />} />
          <Route path={ROUTERS.HOME} element={<Home />} />
          <Route
            path={ROUTERS.HISTORY_DOCUMENT}
            element={<HistoryDocument />}
          />
          <Route
            path={ROUTERS.HISTORY_DOCUMENT_DETAIL}
            element={<HistoryDocumentDetail />}
          />
          <Route
            path={ROUTERS.LOGIN}
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path={ROUTERS.IMAGE_RESTORATION}
            element={
              <PrivateRoute>
                <ImageRestoration />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
