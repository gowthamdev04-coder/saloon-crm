import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

function PeakHoursChart({ items }) {
  const preparePeakHoursData = (items) => {
    const hours = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      customers: 0,
    }));

    items.forEach((item) => {
      const date = new Date(item.createdAt);
      const hour = date.getHours();
      hours[hour].customers += 1;
    });

    return hours;
  };

  const data = preparePeakHoursData(items);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="customers" fill="#ff9800" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PeakHoursChart;
