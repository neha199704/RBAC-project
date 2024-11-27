import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const App = () => {
  const [role, setRole] = useState(Cookies.get("role") || "");
  const roles = useSelector((state) => state.roles.roles);

  const handleRoleSelection = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    Cookies.set("role", selectedRole, { expires: 1 });
  };

  const handleLogout = () => {
    Cookies.remove("role");
    setRole("");
  };

  const selectedRolePermissions =
    roles.find((roleItem) => roleItem.name === role)?.permissions || [];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="font-bold mb-6 text-7xl">RBAC Dashboard</h1>

      {!role ? (
        <>
          <h3 className="mb-4 font-bold text-black text-4xl">Log in as</h3>
          <ul className="max-w-screen-xl w-52 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {roles.map((roleItem) => (
              <li
                key={roleItem.id}
                className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
              >
                <div className="flex items-center ps-3">
                  <input
                    id={`role-${roleItem.id}`}
                    type="radio"
                    value={roleItem.name}
                    name="role"
                    onChange={handleRoleSelection}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={`role-${roleItem.id}`}
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {roleItem.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h3 className="mb-4 font-bold text-black text-4xl">
            Welcome, {role}
          </h3>
          <div className="mt-6 space-x-4">
            <Link to="/users" state={{ permissions: selectedRolePermissions }}>
              <button
                type="button"
                className="text-white bg-teal-500 hover:bg-teal-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Manage Users
              </button>
            </Link>
            <Link to="/role" state={{ permissions: selectedRolePermissions }}>
              <button
                type="button"
                className="text-white bg-teal-500 hover:bg-teal-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Manage Roles
              </button>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
