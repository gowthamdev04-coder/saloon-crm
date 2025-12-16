import { Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function CustomersByStaffChart({ items }) {
  const data = Object.values(
    items.reduce((acc, item) => {
      acc[item.staff] = acc[item.staff] || {
        staff: item.staff,
        customers: 0,
      };
      acc[item.staff].customers += 1;
      return acc;
    }, {})
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Customers per Staff
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="staff" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="customers" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default CustomersByStaffChart;
