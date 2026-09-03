function FunFactCard({ totalLanguages, topLanguage, topLanguagePercent, mostForkedRepo, descriptionCoverage }) {
  return (
    <div className="bg-[#181B22] rounded-lg p-4 w-full mt-4">
      <h3 className="text-sm text-gray-300 mb-4">Fun Facts</h3>

      <div className="grid grid-cols-2 gap-4">
        
        <div className="bg-[#0E1118] rounded-md p-3">
          <p className="text-xs text-gray-400">Languages Known</p>
          <p className="text-lg font-semibold mt-1">{totalLanguages}</p>
        </div>

        <div className="bg-[#0E1118] rounded-md p-3">
          <p className="text-xs text-gray-400">Top Language Share</p>
          <p className="text-lg font-semibold mt-1">{topLanguage} — {topLanguagePercent}%</p>
        </div>

        <div className="bg-[#0E1118] rounded-md p-3">
          <p className="text-xs text-gray-400">Most Forked Repo</p>
          <p className="text-lg font-semibold mt-1">
            {mostForkedRepo ? `${mostForkedRepo.name} (${mostForkedRepo.forks_count} forks)` : "N/A"}
          </p>
        </div>

        <div className="bg-[#0E1118] rounded-md p-3">
          <p className="text-xs text-gray-400">Repos with Description</p>
          <p className="text-lg font-semibold mt-1">{descriptionCoverage}%</p>
        </div>

      </div>
    </div>
  );
}

export default FunFactCard;