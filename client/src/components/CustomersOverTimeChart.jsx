import { Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function CustomersOverTimeChart({ items }) {
  const dataMap = {};

  items.forEach((item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    dataMap[date] = (dataMap[date] || 0) + 1;
  });

  const data = Object.keys(dataMap).map((date) => ({
    date,
    customers: dataMap[date],
  }));

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Customers Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="customers"
            stroke="#4caf50"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default CustomersOverTimeChart;
