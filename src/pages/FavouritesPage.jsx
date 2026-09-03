import { Star } from "lucide-react";
import { useEffect } from "react";
import { jsx } from "react/jsx-runtime";

function FavouritesPage({ favourites, getUsers, toggleFavourite }) {
  if (favourites.length === 0) {
    return <p className="text-gray-500 text-center">No favourites added yet.</p>;
  }

  

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {favourites.map((f) => (
        <div
          key={f.login}
          className="bg-[#181B22] rounded-lg p-4 flex items-center gap-4"
        >
          <img
            src={f.avatar_url}
            className="w-14 h-14 rounded-full cursor-pointer"
            onClick={() => getUsers(f.login)}
          />

          <div className="flex-1 cursor-pointer" onClick={() => getUsers(f.login)}>
            <p className="font-semibold">{f.name || f.login}</p>
            <p className="text-gray-400 text-sm">{f.login}</p>
          </div>

          <button
            onClick={() => toggleFavourite(f)}
            className="px-3 py-1 bg-[#272B36] rounded-md text-xs hover:bg-[#31374 3] flex items-center gap-1"
          >
            <Star size={12} className="text-yellow-400" fill="#facc15" />
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavouritesPage;