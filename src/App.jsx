import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useFavourites } from "./hooks/useFavourites";
import { useGithubProfile } from "./hooks/useGithubProfile";
import { useCompare } from "./hooks/useCompare";

import Navbar from "./components/layout/navbar";
import Sidebar from "./components/layout/sidebar";
import Branding from "./components/Branding";
import SearchBar from "./components/searchbar";
import ProfilePage from "./pages/ProfilePage";
import FavouritesPage from "./pages/FavouritesPage";
import ComparePage from "./pages/ComparePage";
import Footer from "./components/footer";

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const { favourites, toggleFavourite } = useFavourites();
  const { user, username, setUsername, loading, repo, error, langStats, getUsers } = useGithubProfile();
  const { userA, userB, repoA, repoB, usernameA, usernameB, setUserNameA, setUserNameB, handleCompare, errors, resetCompare } = useCompare();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#08090C] text-white flex flex-col">
      <Navbar
        user={user}
        username={username}
        setUsername={setUsername}
        getUsers={getUsers}
        resetCompare={resetCompare}
      />

      <div className="flex flex-1">
        {location.pathname !== "/compare" && (
          <Sidebar
            user={user}
            toggleFavourite={() => toggleFavourite(null, user)}
            isFavourite={favourites.some((f) => f.login === user.login)}
          />
        )}

        <div className="flex-1 flex flex-col items-center mt-20 gap-4 p-6">

          <Routes>
            <Route
              path="/"
              element={
                <div className="w-full flex-1 flex flex-col">
                  <Branding />

                  <div className="w-full">
                    <SearchBar
                      username={username}
                      setUsername={setUsername}
                      getUsers={getUsers}
                    />

                    <div className="flex justify-center gap-3 mt-8">
                      <button
                        onClick={() => navigate("/compare")}
                        className="px-4 py-2 bg-[#08090C] border border-gray-500 rounded-xl text-sm text-gray-300 hover:bg-[#22262f] cursor-pointer"
                      >
                        Compare
                      </button>

                      <button
                        onClick={() => navigate("/favourites")}
                        className="px-4 py-2 bg-[#08090C] border border-gray-500 rounded-xl text-sm text-gray-300 hover:bg-[#22262f] cursor-pointer"
                      >
                        Favourites
                      </button>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Footer />
                  </div>
                </div>
              }
            />

            <Route
              path="/profile/:username"
              element={
                <ProfilePage
                  user={user}
                  repo={repo}
                  langStats={langStats}
                  loading={loading}
                  error={error}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  getUsers={getUsers}
                />
              }
            />

            <Route
              path="/compare"
              element={
                <ComparePage
                  userA={userA}
                  userB={userB}
                  repoA={repoA}
                  repoB={repoB}
                  usernameA={usernameA}
                  usernameB={usernameB}
                  setUserNameA={setUserNameA}
                  setUserNameB={setUserNameB}
                  handleCompare={handleCompare}
                  errors={errors}
                  resetCompare={resetCompare}
                />
              }
            />

            <Route
              path="/favourites"
              element={
                <FavouritesPage
                  favourites={favourites}
                  getUsers={getUsers}
                  toggleFavourite={(f) => toggleFavourite(f, user)}
                />
              }
            />
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;