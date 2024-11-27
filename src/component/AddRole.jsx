import React, { useState } from "react";

const AddRole = ({ onClose, onSave, isEditing, role }) => {
  const [name, setName] = useState(role?.name || "");
  const [permissions, setPermissions] = useState(role?.permissions || []);

  const handleSave = () => {
    const newRole = { ...role, name, permissions };
    onSave(newRole);
  };

  const togglePermission = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Role" : "Add Role"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Permissions</label>
          {["read", "write", "delete"].map((permission) => (
            <div key={permission} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={permission}
                checked={permissions.includes(permission)}
                onChange={() => togglePermission(permission)}
                className="w-4 h-4"
              />
              <label htmlFor={permission} className="ml-2">
                {permission}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
