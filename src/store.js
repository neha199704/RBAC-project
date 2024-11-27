import { configureStore } from "@reduxjs/toolkit";
import rolesReducer from "./features/roles/rolesSlice";
import usersReducer from "./features/users/usersSlice";

export const store = configureStore({
  reducer: {
    roles: rolesReducer,
    users: usersReducer,
  },
});

export default store;
