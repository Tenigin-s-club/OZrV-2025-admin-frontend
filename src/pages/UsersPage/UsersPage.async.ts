import { lazy } from "react";

const UsersPageAsync = lazy(() => import("./UsersPage"));
export default UsersPageAsync;
