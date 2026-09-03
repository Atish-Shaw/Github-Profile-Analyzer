import { useState } from "react";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { getLanguageColor } from "../utils/languageColors";

function timeAgo(dateString) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  const days = Math.floor(seconds / 86400);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

function RepoList({ repo }) {
  const [sortOrder, setSortOrder] = useState("latest");
  const [visibleCount, setVisibleCount] = useState(10);

  const sortedRepos = [...repo].sort((a, b) => {
    const dateA = new Date(a.pushed_at);
    const dateB = new Date(b.pushed_at);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  const visibleRepos = sortedRepos.slice(0, visibleCount);

  return (
    <div className="bg-[#181B22] rounded-lg p-6 w-full mt-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300">
            Top Repositories
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Showing {visibleRepos.length} of {sortedRepos.length} repos
          </p>
        </div>

        <button
          onClick={() => setSortOrder(sortOrder === "latest" ? "oldest" : "latest")}
          className="px-3 py-1 bg-[#272B36] rounded-md text-xs hover:bg-[#31374 3]"
        >
          Sort: {sortOrder === "latest" ? "Latest → Oldest" : "Oldest → Latest"}
        </button>
      </div>

      {sortedRepos.length === 0 ? (
        <p className="text-gray-500 text-sm">No repositories found.</p>
      ) : (
        <>
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="text-gray-400 border-b border-white/10">
                <th className="pb-3 font-normal text-left w-2/5">Repository</th>
                <th className="pb-3 font-normal text-left w-1/6">Language</th>
                <th className="pb-3 font-normal text-left w-1/12">Stars</th>
                <th className="pb-3 font-normal text-left w-1/12">Forks</th>
                <th className="pb-3 font-normal text-left w-1/12">Watchers</th>
                <th className="pb-3 font-normal text-left w-1/6">Last Push</th>
              </tr>
            </thead>
            <tbody>
              {visibleRepos.map((r) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-[#1B1F27]">
                  <td className="py-3">
                    <a
                      href={r.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 font-medium text-blue-400 hover:underline truncate"
                    >
                      {r.name}
                      <ExternalLink size={12} className="flex-shrink-0" />
                    </a>
                  </td>

                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                        style={{ backgroundColor: getLanguageColor(r.language) }}
                      ></span>
                      {r.language || "—"}
                    </div>
                  </td>

                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400" />
                      {r.stargazers_count}
                    </div>
                  </td>

                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <GitFork size={14} className="text-gray-400" />
                      {r.forks_count}
                    </div>
                  </td>

                  <td className="py-3">{r.watchers_count}</td>
                  <td className="py-3 text-gray-400">{timeAgo(r.pushed_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {visibleCount < sortedRepos.length && (
            <div className="flex justify-center">
              <button
                onClick={() => setVisibleCount(visibleCount + 10)}
                className="mt-4 px-4 py-2 bg-[#272B36] rounded-md text-xs hover:bg-[#31374 3]"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RepoList;