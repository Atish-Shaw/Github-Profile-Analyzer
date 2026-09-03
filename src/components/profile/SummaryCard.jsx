import { Star } from "lucide-react";

function SummaryCard({ totalStars, totalForks, reposCount, githubUrl }) {
  return (
    <div className="bg-[#181B22] rounded-lg p-6 flex items-center justify-between w-full mt-4">
      
      {/* Left side */}
      <div className="flex-1">
        <div className="flex items-center gap-2 text-gray-400 text-lg">
          <span className="w-8 h-8 rounded-lg bg-[#161b61] flex justify-center items-center">
            <Star
            className="w-4 h-4 fill-[#EFFF00] stroke-[#EFFF00]"
            strokeWidth={2}
            />
          </span>

          
          <span className="uppercase tracking-wide">Total Stars</span>
        </div>
        <p className="text-4xl font-bold mt-2">{totalStars}</p>

        <div className="border-t border-white/10 my-4"></div>

        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Repos</p>
            <p className="text-xl font-semibold mt-1">{reposCount}</p>
          </div>

          <div className="border-l border-white/10 h-10"></div>

          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Forks</p>
            <p className="text-xl font-semibold mt-1">{totalForks}</p>
          </div>

          <div className="border-l border-white/10 h-10"></div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-[#1F6FEB] rounded-md text-sm hover:bg-[#31374 3]"
          >
            Visit GitHub
          </a>
        </div>
      </div>

      {/* Right side - Badge */}
      <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-black text-sm font-medium ml-6 shrink-0">
        Badge rank
      </div>

    </div>
  );
}

export default SummaryCard;