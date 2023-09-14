import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import ErrorPage from '../pages/ErrorPage'
import Home from "../pages/Home";
import ArticleDetail from "../pages/ArticleDetail";
import NewArticle from "../pages/NewArticle";
import UserCenter from "../pages/UserCenter";
import LoginPage from "../pages/LoginPage";
import EditProfile from "../pages/EditProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/article/:id",
                element: <ArticleDetail />,
            },
            {
                path: "/article/write",
                element: <NewArticle />,
            },
            {
                path: "/user/:id",
                element: <UserCenter />,
            },
            {
                path: "/user/edit",
                element: <EditProfile />
            }
        ]
    }
])

export default router