import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [
    { id: 1, name: "Admin", permissions: ["read", "write", "delete"] },
    { id: 2, name: "Editor", permissions: ["read", "write"] },
    { id: 3, name: "Viewer", permissions: ["read"] },
  ],
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    addRole(state, action) {
      const newRoleId =
        state.roles.length > 0 ? state.roles[state.roles.length - 1].id + 1 : 1;
      state.roles.push({ id: newRoleId, ...action.payload });
    },

    editRole(state, action) {
      const index = state.roles.findIndex(
        (role) => role.id === action.payload.id
      );
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
    },

    deleteRole(state, action) {
      const index = state.roles.findIndex((role) => role.id === action.payload);
      if (index !== -1) {
        state.roles.splice(index, 1);
      }
    },
  },
});

export const { addRole, editRole, deleteRole } = rolesSlice.actions;
export default rolesSlice.reducer;
