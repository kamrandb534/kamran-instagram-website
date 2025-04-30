import { Outlet, Link } from "react-router-dom";
import { HomeIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const ConsumerLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/gallery" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-800 hover:text-primaryorange-100 transition-colors duration-200">
              ImageHub
            </h1>
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link 
              to="/gallery" 
              className="flex items-center space-x-2 text-gray-600 hover:text-primaryorange-100 transition-colors duration-200"
            >
              <HomeIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            
            <Link 
              to="/search" 
              className="flex items-center space-x-2 text-gray-600 hover:text-primaryorange-100 transition-colors duration-200"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Search</span>
            </Link>
            
            <button 
              onClick={handleLogout} 
              className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-red-500">Logout</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ConsumerLayout;
