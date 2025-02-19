import { Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Mobile Menu Button */}
      <button onClick={toggleSidebar} className="md:hidden text-gray-600">
        <Menu size={28} />
      </button>

      {/* Title */}
      <div className="text-xl font-semibold text-gray-900">Development</div>

      {/* Search & Profile */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
          I
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
