import { Paper, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function DashboardGraph({ items }) {
  // Aggregate customers per staff
  const staffCount = items.reduce((acc, item) => {
    acc[item.staff] = (acc[item.staff] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(staffCount).map((staff) => ({
    staff,
    customers: staffCount[staff],
  }));

  return (
    <Paper sx={{ mt: 5, p: 2, maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Customers per Staff
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="staff" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="customers" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default DashboardGraph;
