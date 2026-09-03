import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];

  return (
    <div className="bg-[#0E1118] rounded-lg px-3 py-2 shadow-lg">
      <p
        className="text-sm font-medium"
        style={{ color: data.color }}
      >
        {data.name}: {data.value}
      </p>
    </div>
  );
};

function LanguageChart({ chartData, COLORS }) {
  return (
    <div className="bg-[#181B22] rounded-lg p-4 flex-1">
      <h3 className="text-sm text-gray-300 mb-2">
        Languages breakdown
      </h3>

      {chartData.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No language data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip 
              content={<CustomTooltip />}
              animationDuration={0} />

            <Legend
              formatter={(value) => (
                <span className="text-gray-300 text-sm">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default LanguageChart;