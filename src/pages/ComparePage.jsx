import React from 'react';

function ComparePage({ 
  userA, 
  userB, 
  repoA, 
  repoB, 
  usernameA, 
  usernameB, 
  setUserNameA, 
  setUserNameB, 
  handleCompare, 
  errors,
  resetCompare
}) {

  const repoCountA = repoA?.length || 0;
  const repoCountB = repoB?.length || 0;

  const languagesA = new Set(
    (repoA || []).map((repo) => repo.language).filter(Boolean)
  ).size;

  const languagesB = new Set(
    (repoB || []).map((repo) => repo.language).filter(Boolean)
  ).size;

  const starsA = (repoA || []).reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );

  const starsB = (repoB || []).reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );

  const forksA = (repoA || []).reduce(
    (total, repo) => total + repo.forks_count,
    0
  );

  const forksB = (repoB || []).reduce(
    (total, repo) => total + repo.forks_count,
    0
  );

  const mostStarredA = [...(repoA || [])].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0];

  const mostStarredB = [...(repoB || [])].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0];

  const stats = [
    {
      label: "Total Repos",
      valueA: repoCountA,
      valueB: repoCountB
    },
    {
      label: "Known Languages",
      valueA: languagesA,
      valueB: languagesB
    },
    {
      label: "Total Stars",
      valueA: starsA,
      valueB: starsB
    },
    {
      label: "Total Forks",
      valueA: forksA,
      valueB: forksB
    },
    {
      label: "Followers",
      valueA: userA?.followers || 0,
      valueB: userB?.followers || 0
    },
    {
      label: "Following",
      valueA: userA?.following || 0,
      valueB: userB?.following || 0
    }
  ];

  const scoreA = stats.reduce((score, stat) => {
    return score + (stat.valueA > stat.valueB ? 1 : 0);
  }, 0);

  const scoreB = stats.reduce((score, stat) => {
    return score + (stat.valueB > stat.valueA ? 1 : 0);
  }, 0);

  let winner = null;

  if (scoreA > scoreB) {
    winner = userA?.login;
  } else if (scoreB > scoreA) {
    winner = userB?.login;
  }

  const renderStatRow = (label, valA, valB) => {

    const isAGreater = valA > valB;
    const isBGreater = valB > valA;

    const colorA = isAGreater
      ? "text-[#3fb950]"
      : isBGreater
        ? "text-[#f85149]"
        : "text-gray-300";

    const colorB = isBGreater
      ? "text-[#3fb950]"
      : isAGreater
        ? "text-[#f85149]"
        : "text-gray-300";

    return (
      <div className="grid grid-cols-3 py-4 border-b border-gray-800/60 last:border-0 hover:bg-white/[0.02] transition-colors">
        <div className="flex items-center text-sm font-medium text-[#58a6ff]">
          {label}
        </div>

        <div className={`flex items-center justify-center text-base font-semibold ${colorA}`}>
          {valA}
        </div>

        <div className={`flex items-center justify-center text-base font-semibold ${colorB}`}>
          {valB}
        </div>
      </div>
    );
  };

  const renderUserCard = (user, repoCount, waitingText) => {

    if (!user) {
      return (
        <div className="w-full bg-[#0d1117] border border-gray-800 rounded-2xl p-8 flex flex-col min-h-[360px]">
          <div className="h-full w-full flex items-center justify-center text-gray-600 font-medium">
            {waitingText}
          </div>
        </div>
      );
    }

    return (
      <div className="group relative w-full bg-[#0d1117] border border-gray-800 rounded-2xl p-8 flex flex-col min-h-[360px] shadow-xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-600 hover:shadow-[0_0_30px_rgba(255,255,255,0.07)]">

        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

        <div className="relative z-10 flex flex-col items-center text-center">

          <img src={user.avatar_url} alt={user.login} className="w-32 h-32 rounded-full border-4 border-[#08090C] shadow-lg mb-4" />

          <h2 className="text-2xl font-bold">
            {user.name || user.login}
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            @{user.login}
          </p>

          <div className="grid grid-cols-3 gap-4 w-full border-t border-gray-800 pt-6 mt-4">

            <div>
              <div className="text-2xl font-bold">
                {user.followers}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                Followers
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold">
                {user.following}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                Following
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold">
                {repoCount}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                Repos
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen w-full text-white flex flex-col items-center py-12 px-4 md:px-8 overflow-x-hidden">

      {/* Header */}
      <div className="w-full max-w-5xl text-center mb-10">

        <h1 className="text-4xl md:text-5xl font-pixel tracking-tight mb-3 border-b border-white/20 pb-6 px-2">
          Compare Profiles
        </h1>

      </div>

      {/* Search */}
      <div className="w-full max-w-5xl p-2 md:p-10 shadow-2xl flex flex-col md:flex-row items-stretch justify-center gap-4 relative">

        <div className="relative flex flex-1 w-full border border-gray-600 rounded-xl bg-[#0d1117] items-center">

          <div className="flex-1 border-r border-gray-600">

            <input
              type="text"
              placeholder="First User"
              value={usernameA}
              onChange={(e) => setUserNameA(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCompare();
              }}
              className="w-full h-full bg-transparent rounded-l-xl px-4 py-3 md:py-4 text-base outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-600 text-center"
            />

          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#238636] border border-gray-600 shadow-lg z-10">

            <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-wider">
              vs
            </span>

          </div>

          <div className="flex-1">

            <input
              type="text"
              placeholder="Second User"
              value={usernameB}
              onChange={(e) => setUserNameB(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCompare();
              }}
              className="w-full h-full bg-transparent rounded-r-xl px-4 py-3 md:py-4 text-base outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-600 text-center"
            />

          </div>

        </div>

        <div className="w-full md:w-auto shrink-0 flex">

          <button
            onClick={handleCompare}
            className="w-full md:w-auto flex items-center justify-center py-1 px-6 rounded-xl transition-colors shadow-md border border-gray-600 cursor-pointer hover:bg-[#161b22]"
          >

            <svg width="18" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>

          </button>

          <button
            onClick={resetCompare}
            className="w-full md:w-auto px-5 py-3 ml-4 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#161b22] hover:text-white transition-colors cursor-pointer"
          >
            Reset
          </button>

        </div>

      </div>

      {/* Error */}
      {errors && (
        <div className="mt-6 w-full max-w-5xl bg-red-900/20 border border-red-800 text-red-400 text-center py-3 px-4 rounded-lg">
          {errors}
        </div>
      )}

      {/* Results */}
      {(userA || userB) && (

        <div className="w-full max-w-7xl mt-12 flex flex-col gap-8">

          {/* User Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {renderUserCard(userA, repoCountA, "Awaiting First User...")}

            {renderUserCard(userB, repoCountB, "Awaiting Second User...")}

          </div>

          {/* Comparison */}
          {userA && userB && (

            <>
              <div className="w-full bg-[#0d1117] border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl">

                <div className="mb-6">

                  <h3 className="text-gray-200 text-sm font-bold uppercase tracking-widest">
                    Profile Comparison
                  </h3>

                  <p className="text-gray-500 text-xs mt-1">
                    Comparing profile and repository metrics
                  </p>

                </div>

                <div className="grid grid-cols-3 pb-4 border-b border-gray-700">

                  <div className="text-gray-400 text-sm font-medium">
                    Parameter
                  </div>

                  <div className="text-center text-gray-400 text-sm font-medium">
                    {userA.login}
                  </div>

                  <div className="text-center text-gray-400 text-sm font-medium">
                    {userB.login}
                  </div>

                </div>

                <div className="mt-2">

                  {stats.map((stat) =>
                    renderStatRow(stat.label, stat.valueA, stat.valueB)
                  )}

                </div>

              </div>

              {/* Most Starred Repositories */}
              <div className="w-full bg-[#0d1117] border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl">

                <div className="mb-6">

                  <h3 className="text-gray-200 text-sm font-bold uppercase tracking-widest">
                    Most Starred Repository
                  </h3>

                  <p className="text-gray-500 text-xs mt-1">
                    The repository with the most stars for each user
                  </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="border border-gray-800 rounded-lg p-5 hover:border-gray-600 transition-colors">

                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                      {userA.login}
                    </p>

                    {mostStarredA ? (
                      <>
                        <h4 className="text-lg font-semibold text-white">
                          {mostStarredA.name}
                        </h4>

                        <p className="text-gray-500 text-sm mt-2">
                          {mostStarredA.description || "No description available"}
                        </p>

                        <div className="flex items-center gap-4 mt-4 text-sm">
                          <span className="text-yellow-400">
                            ⭐ {mostStarredA.stargazers_count}
                          </span>

                          <span className="text-gray-400">
                            🍴 {mostStarredA.forks_count}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-600">
                        No repositories
                      </p>
                    )}

                  </div>

                  <div className="border border-gray-800 rounded-lg p-5 hover:border-gray-600 transition-colors">

                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                      {userB.login}
                    </p>

                    {mostStarredB ? (
                      <>
                        <h4 className="text-lg font-semibold text-white">
                          {mostStarredB.name}
                        </h4>

                        <p className="text-gray-500 text-sm mt-2">
                          {mostStarredB.description || "No description available"}
                        </p>

                        <div className="flex items-center gap-4 mt-4 text-sm">
                          <span className="text-yellow-400">
                            ⭐ {mostStarredB.stargazers_count}
                          </span>

                          <span className="text-gray-400">
                            🍴 {mostStarredB.forks_count}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-600">
                        No repositories
                      </p>
                    )}

                  </div>

                </div>

              </div>

              {/* Overall Winner */}
              <div className="w-full bg-[#0d1117] border border-gray-800 rounded-xl p-8 shadow-xl text-center">

                <p className="text-gray-500 text-xs uppercase tracking-[0.25em] mb-4">
                  Overall Result
                </p>

                {winner ? (
                  <>
                    <div className="text-4xl mb-3">
                      🏆
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {winner} wins
                    </h2>

                    <p className="text-gray-500 mt-3">
                      {scoreA} - {scoreB}
                    </p>

                    <div className="flex justify-center gap-8 mt-6 text-sm">

                      <div>
                        <p className="text-gray-500">
                          {userA.login}
                        </p>

                        <p className="text-xl font-bold text-[#3fb950]">
                          {scoreA}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">
                          {userB.login}
                        </p>

                        <p className="text-xl font-bold text-[#3fb950]">
                          {scoreB}
                        </p>
                      </div>

                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl mb-3">
                      🤝
                    </div>

                    <h2 className="text-2xl font-bold">
                      It's a tie
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Both users have the same score.
                    </p>
                  </>
                )}

              </div>

            </>

          )}

        </div>

      )}

    </div>
  );
}

export default ComparePage;