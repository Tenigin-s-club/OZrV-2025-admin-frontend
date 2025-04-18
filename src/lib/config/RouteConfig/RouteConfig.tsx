import Layout from "@/components/shared/layout";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import AuthPageAsync from "@/pages/AuthPage/AuthPage.async";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import RegisterPageAsync from "@/pages/RegisterPage/RegisterPage.async";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import CreateMeetingPageAsync from "@/pages/CreateMeetingPage/CreateMeetingPage.async";
import UsersPageAsync from "@/pages/UsersPage/UsersPage.async";

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
        path: "/users/:id",
        element: <UsersPageAsync />,
      },
      {
        path: "/analytics/create",
        element: <CreateMeetingPageAsync />,
      },
    ],
  },
]);
