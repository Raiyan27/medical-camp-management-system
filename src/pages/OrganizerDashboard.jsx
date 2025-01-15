import { Link, Outlet } from "react-router-dom";

const OrganizerDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-44 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold text-center mb-8">Dashboard Menu</h2>
        <ul className="space-y-4">
          <li>
            <Link to="profile" className="text-white hover:text-primary">
              Organizer Profile
            </Link>
          </li>
          <li>
            <Link to="add-camp" className="text-white hover:text-primary">
              Add A Camp
            </Link>
          </li>
          <li>
            <Link to="manage-camps" className="text-white hover:text-primary">
              Manage Camps
            </Link>
          </li>
          <li>
            <Link to="manage-users" className="text-white hover:text-primary">
              Manage Users
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Organizer Dashboard</h1>

        <Outlet />
      </div>
    </div>
  );
};

export default OrganizerDashboard;
