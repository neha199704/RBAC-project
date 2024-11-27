import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, addUser, editUser } from "../features/users/usersSlice";
import EditAddUser from "../component/EditAddUser";
import { useLocation } from "react-router-dom";

const Users = () => {
  const location = useLocation();
  const permissions = location.state?.permissions || [];
  const canWrite = permissions.includes("write");
  const canDelete = permissions.includes("delete");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const users = useSelector((state) => state.users.users);
  const roles = useSelector((state) => state.roles.roles) || [];
  const dispatch = useDispatch();

  const handleSaveUser = (user) => {
    if (isEditing) {
      dispatch(editUser(user));
    } else {
      const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      const newUser = { ...user, id: newUserId };
      dispatch(addUser(newUser));
    }
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentUser({});
  };

  const handleEdit = (user) => {
    if (canWrite) {
      setIsEditing(true);
      setCurrentUser(user);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (userId) => {
    if (canDelete) {
      dispatch(deleteUser(userId));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-900 w-full z-20 mb-10 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <h1 className="text-2xl font-semibold dark:text-white">
            Users Management
          </h1>
        </div>
      </nav>
      <div className="flex justify-between items-center mb-4 max-w-screen-xl mx-auto">
        <input
          type="text"
          placeholder="Search by user name or email..."
          className="border p-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {canWrite && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add User <i class="fa-solid fa-user-plus"></i>
          </button>
        )}
      </div>
      <div className="max-w-screen-xl mx-auto shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              {canWrite || canDelete ? (
                <th className="px-6 py-3">Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.status}</td>
                {canWrite || canDelete ? (
                  <td className="px-6 py-4 space-x-2">
                    {canWrite && (
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-500 text-white py-1 px-2 rounded"
                      >
                        <i class="fa-solid fa-user-pen"></i>
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(user.id)}
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
        <EditAddUser
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
          isEditing={isEditing}
          user={currentUser}
          roles={roles}
        />
      )}
    </div>
  );
};

export default Users;
