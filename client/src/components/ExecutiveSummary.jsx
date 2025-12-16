import { Grid, Paper, Typography, useTheme, useMediaQuery, Box } from "@mui/material";

const cardStyles = [
  { background: "rgba(255, 99, 132, 0.7)" },   // pink
  { background: "rgba(54, 162, 235, 0.7)" },   // blue
  { background: "rgba(255, 206, 86, 0.7)" },   // yellow
  { background: "rgba(75, 192, 192, 0.7)" },   // teal
];

function SummaryCard({ title, value, style }) {
  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        textAlign: "center",
        color: "#fff",
        background: style.background,
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        transition: "transform 0.3s",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );
}

function ExecutiveSummary({ items }) {
  const totalCustomers = items.length;
  const totalRevenue = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const avgBill = totalCustomers > 0 ? Math.round(totalRevenue / totalCustomers) : 0;
  const uniqueStaff = new Set(items.map((i) => i.staff)).size;

  const summaryData = [
    { title: "Total Customers", value: totalCustomers },
    { title: "Total Revenue (₹)", value: totalRevenue },
    { title: "Avg Bill (₹)", value: avgBill },
    { title: "Active Staff", value: uniqueStaff },
  ];

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 1200 }}>
        {summaryData.map((data, index) => (
          <Grid item xs={12} sm={6} md={3} key={data.title}>
            <SummaryCard title={data.title} value={data.value} style={cardStyles[index]} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ExecutiveSummary;
