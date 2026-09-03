import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function RepoTimelineChart({ timelineChartData }) {
  return (
    <div className="bg-[#181B22] rounded-lg p-4 w-full mt-4">
      <h3 className="text-sm text-gray-300 mb-2">
        Repos Created by Year
      </h3>

      {timelineChartData.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No timeline data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={timelineChartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
            barCategoryGap="35%"
          >
            <XAxis
              dataKey="year"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#4B5563" }}
              interval={0}
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
                opacity: 0.4,
              }}
            />

            <Bar
              dataKey="count"
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

export default RepoTimelineChart;