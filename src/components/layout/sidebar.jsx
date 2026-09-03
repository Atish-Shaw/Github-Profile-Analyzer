import { useState } from "react";
import github_pic from "../../assets/github_pic.png";

function Sidebar({ user, toggleFavourite, isFavourite }) {
  
  return (
    <div className="w-64 min-h-[calc(100vh-40px)] bg-[#0E1118] border-r border-gray-600 sticky top-10 flex flex-col items-center pt-10 px-4">
      {user ? (
        <div className="flex flex-col items-center text-center gap-2">
          <img
            src={user.avatar_url}
            className="w-42 h-42 rounded-full border border-[#656363]"
          />
          <h1 className="text-lg font-semibold mt-2">{user.name || user.login}</h1>
          <h2 className="text-gray-400 text-lg">{user.login}</h2>

          <p className="text-xs text-gray-400 mt-1">
            <span className="text-white font-medium">{user.followers}</span> followers ·{" "}
            <span className="text-white font-medium">{user.following}</span> following ·{" "}
            <span className="text-white font-medium">{user.public_repos}</span> repositories
          </p>

          <button onClick={() => toggleFavourite()}
          className="bg-[#272B36] w-full h-8 rounded-md border border-[#656363] mt-4 text-sm hover:bg-[#31374 3] cursor-pointer">
            {isFavourite ? "Remove From Favourite" : "Add to Favourite"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-500">
          {/* octocat / branding placeholder for empty state */}
          <div className="w-42 h-42 rounded-full overflow-hidden">
            <img 
              src={github_pic} alt="logo"
              className="w-full h-full object-cover scale-130" 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;