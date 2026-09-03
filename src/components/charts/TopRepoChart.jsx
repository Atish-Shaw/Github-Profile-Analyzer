import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function TopRepoChart({ topRepos }) {
  const top5Repos = [...topRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return (
    <div className="bg-[#181B22] rounded-lg p-4 flex-1">
      <h3 className="text-sm text-gray-300 mb-2">
        Stargazer count by repo
      </h3>

      {top5Repos.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No repo data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={top5Repos}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
            barCategoryGap="35%"
          >
            <XAxis
              dataKey="name"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#4B5563" }}
              interval={0}
              tickFormatter={(name) =>
                name.length > 12
                  ? `${name.slice(0, 12)}...`
                  : name
              }
            />

            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#4B5563" }}
              allowDecimals={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#374151",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              cursor={{
               fill: "#0E1118",
               opacity:0.4,
              }}
            />

            <Bar
              dataKey="stargazers_count"
              fill="#60a5fa"
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
            
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default TopRepoChart;