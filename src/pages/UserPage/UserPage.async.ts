import { lazy } from "react";

const UserPageAsync = lazy(() => import("./UserPage"));
export default UserPageAsync;
