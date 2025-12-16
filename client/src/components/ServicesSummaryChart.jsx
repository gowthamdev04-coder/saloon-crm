import { Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF", "#FF6B6B"];

function ServicesSummaryChart({ items }) {
  const servicesCount = {};

  items.forEach(item => {
    item.services.forEach(service => {
      servicesCount[service] = (servicesCount[service] || 0) + 1;
    });
  });

  const chartData = Object.keys(servicesCount).map(service => ({
    name: service,
    value: servicesCount[service],
  }));

  return (
    <Paper sx={{ mt: 5, p: 2 }}>
      <Typography variant="h6" gutterBottom>Services Summary</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default ServicesSummaryChart;
