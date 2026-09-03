import { Search, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import github_pic from "../../assets/github_pic.png";

function Navbar({ user, username, setUsername, getUsers, resetCompare, error }) {
  const navigate = useNavigate();
  const location = useLocation();

  const urlUsername = location.pathname.startsWith("/profile/")
    ? location.pathname.split("/profile/")[1]
    : null;

  const [isOpen, setIsOpen] = useState(false);
  const [showError, setShowError] = useState(false); // Added local state for the error toast
  const menuRef = useRef(null);

  // Handle click outside for mobile menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle the error toast vanishing effect
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000); // 3000ms = 3 seconds before it vanishes

      // Cleanup timeout if a new error comes in before the old one vanishes
      return () => clearTimeout(timer); 
    }
  }, [error]);

  let pageName;
  if (location.pathname === "/") {
    pageName = "Dashboard";
  } else if (location.pathname === "/favourites") {
    pageName = "Favourites";
  } else if (location.pathname === "/compare") {
    pageName = "Compare";
  } else if (location.pathname.startsWith("/profile/")) {
    pageName = urlUsername;
  }

  return (
    <div className="w-full h-16 bg-[#08090C] border-b border-gray-600 top-0 z-50 flex items-center justify-between px-4">

      {/* LEFT SIDE */}
      <div className="relative" ref={menuRef}>
        <div className="flex justify-center items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-2 py-2 border border-gray-600 rounded-md
                       hover:bg-[#181B22] hover:border-gray-400
                       cursor-pointer transition duration-200"
          >
            <Menu size={16} color="#bdbdbd" strokeWidth={1.5} className="w-6" />
          </button>

          <div className="w-8 h-8 ml-3 rounded-full overflow-hidden bg-red-500">
            <img
              src={github_pic}
              alt="logo"
              className="object-cover scale-130"
            />
          </div>

          <div className="flex justify-center ml-3">
            <h1 className="text-md">{pageName}</h1>
          </div>
        </div>

        <div
          className={`absolute top-full left-0 mt-2 w-40
            bg-[#181B22] border border-gray-700 rounded-lg
            shadow-xl p-1
            transition-all duration-300 ease-out
            ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
        >
          <button
            onClick={() => {
              resetCompare();
              navigate("/");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 rounded-md
                       text-gray-300 hover:bg-[#292D36]
                       hover:text-white cursor-pointer
                       transition duration-200"
          >
            Home
          </button>

          <button
            onClick={() => {
              navigate("/favourites");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 rounded-md
                       text-gray-300 hover:bg-[#292D36]
                       hover:text-white cursor-pointer
                       transition duration-200"
          >
            Favourites
          </button>

          <button
            onClick={() => {
              navigate("/compare");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 rounded-md
                       text-gray-300 hover:bg-[#292D36]
                       hover:text-white cursor-pointer
                       transition duration-200"
          >
            Compare
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      {user && (
        <div className="relative">
          <Search
            size={16}
            className="absolute mx-2 left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Enter new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getUsers();
              }
            }}
            className="border border-gray-500
                       bg-[#181b22] rounded-sm
                       pl-9 pr-3 m-2 py-1
                       text-sm outline-none text-white"
          />
        </div>
      )}

      {/* ERROR TOAST */}
      {showError && error && (
        <div className="fixed top-20 right-4 bg-[#1F0B0B] border border-red-500/40 text-red-400 px-4 py-3 rounded-lg shadow-xl text-sm z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
          {error}
        </div>
      )}

    </div>
  );
}

export default Navbar;