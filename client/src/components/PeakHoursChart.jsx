import { Paper, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function PeakHoursChart({ items }) {
  const hours = Array.from({ length: 24 }, (_, i) => ({ hour: `${i}:00`, customers: 0 }));

  items.forEach(item => {
    const date = new Date(item.createdAt);
    hours[date.getHours()].customers += 1;
  });

  return (
    <Paper sx={{ mt: 5, p: 2 }}>
      <Typography variant="h6" gutterBottom>Peak Hours</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={hours} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="customers" fill="#ff9800" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default PeakHoursChart;
