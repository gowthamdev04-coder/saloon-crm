import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchItems } from "../services/api";
import DashboardGraph from "../components/DashboardGraph";
import PeakHoursChart from "../components/PeakHoursChart";
import CustomersByStaffChart from "../components/CustomersByStaffChart";
import CustomersOverTimeChart from "../components/CustomersOverTimeChart";
import ExecutiveSummary from "../components/ExecutiveSummary";
import RevenueOverTimeChart from "../components/RevenueOverTimeChart";
import ServicesSummaryChart from "../components/ServicesSummaryChart";

import { toast } from "react-toastify";

function ReportVisualiation() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const { data } = await fetchItems();
        setItems(data);
      } catch (error) {
        toast.error("Failed to fetch items");
        console.error(error);
      }
    };
    loadItems();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Reports & Visualization
      </Typography>

      {/* <DashboardGraph items={items} /> */}
      <CustomersByStaffChart items={items} />
      <CustomersOverTimeChart items={items} />
      <ServicesSummaryChart  items={items} />
      <RevenueOverTimeChart items={items} />

      <Typography variant="h5" gutterBottom sx={{ mt: 5 }}>
        Peak Hours
      </Typography>
      <PeakHoursChart items={items} />
    </Container>
  );
}

export default ReportVisualiation;
