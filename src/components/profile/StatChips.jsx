function StatChips({ topLanguage, memberSince }) {
  return (
    <div className="flex gap-4 w-full mt-4">
      <div className="flex-1 bg-[#181B22] rounded-lg p-4 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-wide">Top Language</p>
        <p className="text-lg font-semibold mt-1">{topLanguage}</p>
      </div>

      <div className="flex-1 bg-[#181B22] rounded-lg p-4 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-wide">Member Since</p>
        <p className="text-lg font-semibold mt-1">{memberSince}</p>
      </div>
    </div>
  );
}

export default StatChips;