import { useState, useEffect } from "react";
export function useFavourites(){
    const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  function toggleFavourite(targetUser , currentUser) {
    const userToToggle = targetUser || currentUser;
    const isAlreadyFavourite = favourites.some((f) => f.login === userToToggle.login);

    if (isAlreadyFavourite) {
      setFavourites(favourites.filter((f) => f.login !== userToToggle.login));
    } else {
      setFavourites([...favourites, {
        login: userToToggle.login,
        avatar_url: userToToggle.avatar_url,
        name: userToToggle.name
      }]);
    }
  }

  return{favourites, toggleFavourite};
}