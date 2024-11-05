import { useState } from "react";
// import { ShoppingCart, User } from "lucide-react";

const LandingPage = ({ onNavigate, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryClick = (category) => {
    // Match the URL structure from your tutor's code
    onNavigate(`/search?category=${category.toLowerCase()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/api/placeholder/40/40"
              alt="Paw Kingdom"
              className="h-10"
            />
            <span className="ml-2 text-xl font-bold">Paw Kingdom</span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md w-full mx-4">
            <div className="flex">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search for pet supplies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>

          {/* Account & Cart */}
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => onNavigate("/account")}
            >
              {/* <User size={20} /> */}
              <span>My Account</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => onNavigate("/cart")}
            >
              {/* <ShoppingCart size={20} /> */}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow grid grid-cols-2">
        {/* Dogs Section */}
        <div
          className="relative cursor-pointer transition-all duration-300 hover:bg-gray-50"
          onClick={() => handleCategoryClick("Dog")}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-transform duration-300 hover:scale-105">
            <div className="mb-8 text-[120px]">🐕</div>
            <h2 className="text-4xl font-bold mb-4">Dogs</h2>
            <p className="text-xl text-gray-600">
              Find supplies for your furry friend
            </p>
          </div>
        </div>

        {/* Cats Section */}
        <div
          className="relative cursor-pointer transition-all duration-300 hover:bg-gray-50"
          onClick={() => handleCategoryClick("Cat")}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-transform duration-300 hover:scale-105">
            <div className="mb-8 text-[120px]">🐱</div>
            <h2 className="text-4xl font-bold mb-4">Cats</h2>
            <p className="text-xl text-gray-600">
              Discover perfect cat supplies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
