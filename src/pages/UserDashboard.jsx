import { Link, Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Participant Dashboard</h2>
        <ul>
          <li>
            <Link to="analytics" className="block mb-4 hover:text-accent">
              Analytics
            </Link>
          </li>
          <li>
            <Link to="profile" className="block mb-4 hover:text-accent">
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="registered-camps"
              className="block mb-4 hover:text-accent"
            >
              Registered Camps
            </Link>
          </li>
          <li>
            <Link to="payment-history" className="block mb-4 hover:text-accent">
              Payment History
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
