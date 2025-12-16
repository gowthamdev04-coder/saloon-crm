import { Paper, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function RevenueOverTimeChart({ items }) {
  const dailyRevenue = {};

  items.forEach(item => {
    const date = new Date(item.createdAt).toLocaleDateString();
    dailyRevenue[date] = (dailyRevenue[date] || 0) + item.amount;
  });

  const chartData = Object.keys(dailyRevenue).sort().map(date => ({
    date,
    revenue: dailyRevenue[date],
  }));

  return (
    <Paper sx={{ mt: 5, p: 2 }}>
      <Typography variant="h6" gutterBottom>Revenue Over Time</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default RevenueOverTimeChart;
