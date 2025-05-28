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
import { Quiz } from "./pages/Quiz";
import MyQuiz from "./pages/MyQuiz";
import { QuizCreate } from "./pages/QuizCreate";
import { QuizUpdate } from "./pages/QuizUpdate";
import MyQuizDetail from "./pages/MyQuizView";
import QuizPlay from "./pages/QuizPlay";
import Notification from "./pages/Notification";
import MyPost from "./pages/MyPost";
import PostCreate from "./pages/PostCreate";
import MyPostDetail from "./pages/MyPostDetail";

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
  return isAuthenticated ? <Navigate to={ROUTERS.HOME} /> : <>{children}</>;
};

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTERS.DEFAULT} element={<Home />} />
          <Route path={ROUTERS.HOME} element={<Home />} />
          {[
            { path: ROUTERS.QUIZ, element: <Quiz /> },
            { path: ROUTERS.IMAGE_RESTORATION, element: <ImageRestoration /> },
            { path: ROUTERS.MY_QUIZ, element: <MyQuiz /> },
            { path: ROUTERS.QUIZ_CREATE, element: <QuizCreate /> },
            { path: ROUTERS.QUIZ_UPDATE, element: <QuizUpdate /> },
            { path: ROUTERS.MY_QUIZ_DETAIL, element: <MyQuizDetail /> },
            { path: ROUTERS.QUIZ_PLAY, element: <QuizPlay /> },
            { path: ROUTERS.NOTIFICATION, element: <Notification /> },
            { path: ROUTERS.MY_POST, element: <MyPost /> },
            { path: ROUTERS.FORUM_CREATE, element: <PostCreate /> },
            { path: ROUTERS.MY_POST_DETAIL, element: <MyPostDetail /> },
          ].map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<PrivateRoute>{element}</PrivateRoute>}
            />
          ))}
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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
