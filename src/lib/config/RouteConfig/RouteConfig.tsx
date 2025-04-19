import Layout from "@/components/shared/layout";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import AuthPageAsync from "@/pages/AuthPage/AuthPage.async";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import RegisterPageAsync from "@/pages/RegisterPage/RegisterPage.async";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import UsersPageAsync from "@/pages/UserPage/UserPage.async";

import AnalyticsPageAsync from "@/pages/AnalyticsPage/AnalyticsPage.async";
import UsersTableAdminPage from "@/pages/UsersTablePage/UsersTablePage";

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <AuthPageAsync />,
  },
  {
    path: "/register",
    element: <RegisterPageAsync />,
  },
];

export const appRoutersConfig = createBrowserRouter([
  ...authRoutes,
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AnalyticsPageAsync />,
      },
      {
        path: "/users",
        element: <UsersTableAdminPage />,
      },
      {
        path: "/events",
        // element: <CreateEve />,
      },
      {
        path: "/users/:id",
        element: <UsersPageAsync />,
      },
    ],
  },
]);
