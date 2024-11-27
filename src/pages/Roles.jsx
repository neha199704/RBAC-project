import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRole, deleteRole, editRole } from "../features/roles/rolesSlice";
import { useLocation } from "react-router-dom";
import AddRole from "../component/AddRole";

const Roles = () => {
  const location = useLocation();
  const permissions = location.state?.permissions || [];
  const canWrite = permissions.includes("write");
  const canDelete = permissions.includes("delete");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const roles = useSelector((state) => state.roles.roles);
  const dispatch = useDispatch();

  const handleSaveRole = (role) => {
    if (isEditing) {
      dispatch(editRole(role));
    } else {
      const newRoleId = roles.length > 0 ? roles[roles.length - 1].id + 1 : 1;
      const newRole = { ...role, id: newRoleId };
      dispatch(addRole(newRole));
    }
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentRole({});
  };

  const handleEdit = (role) => {
    if (canWrite) {
      setIsEditing(true);
      setCurrentRole(role);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (roleId) => {
    if (canDelete) {
      dispatch(deleteRole(roleId));
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-900 w-full z-20 mb-10 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <h1 className="text-2xl font-semibold dark:text-white">
            Roles Management
          </h1>
        </div>
      </nav>
      <div className="flex justify-between items-center mb-4 max-w-screen-xl mx-auto">
        <input
          type="text"
          placeholder="Search by role name..."
          className="border p-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {canWrite && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Role <i class="fa-solid fa-user-plus"></i>
          </button>
        )}
      </div>
      <div className="max-w-screen-xl mx-auto shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Role Name</th>
              <th className="px-6 py-3">Permissions</th>
              {canWrite || canDelete ? (
                <th className="px-6 py-3">Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {filteredRoles.map((role) => (
              <tr
                key={role.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{role.id}</td>
                <td className="px-6 py-4">{role.name}</td>
                <td className="px-6 py-4">{role.permissions.join(", ")}</td>
                {canWrite || canDelete ? (
                  <td className="px-6 py-4 space-x-2">
                    {canWrite && (
                      <button
                        onClick={() => handleEdit(role)}
                        className="bg-yellow-500 text-white py-1 px-2 rounded"
                      >
                        <i class="fa-solid fa-user-pen"></i>
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(role.id)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    )}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AddRole
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveRole}
          isEditing={isEditing}
          role={currentRole}
        />
      )}
    </div>
  );
};

export default Roles;
