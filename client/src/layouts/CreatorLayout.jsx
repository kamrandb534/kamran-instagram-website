import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  ArrowLeftOnRectangleIcon,
  PhotoIcon,
  ChartBarSquareIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const CreatorLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <SparklesIcon className="h-8 w-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">Creator Panel</h2>
          </div>
          <nav className="space-y-2">
            <Link 
              to="/upload" 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive("/upload") 
                  ? "bg-orange-50 text-orange-700" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ChartBarSquareIcon className="h-5 w-5" />
              Dashboard
            </Link>
            <Link 
              to="/creator-dashboard" 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive("/creator-dashboard") 
                  ? "bg-orange-50 text-orange-700" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <PhotoIcon className="h-5 w-5" />
              Upload Media
            </Link>
          </nav>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600 mb-3">Logged in as: {user?.name || "Creator"}</p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 justify-center bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default CreatorLayout;
