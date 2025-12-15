import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Box,
  Typography
} from "@mui/material";
import { useState } from "react";
import { createItem } from "../services/api";

const serviceOptions = [
  "Hair Cutting",
  "Hair Trimming",
  "Shaving & Beard Grooming",
  "Head Massage",
  "Waxing",
  "Steam Therapy"
];
const staffOptions = ["Staff1", "Staff2"];

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    services: [],
    amount: "",
    staff: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData({ ...formData, [name]: value.replace(/\D/g, "") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMultiSelectChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      services: typeof value === "string" ? value.split(",") : value
    });
  };

  const addItem = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.phone || formData.phone.length < 10) {
      toast.error("Enter a valid phone number");
      return;
    }
    if (!formData.services.length) {
      toast.error("Select at least one service");
      return;
    }
    if (formData.amount && Number(formData.amount) <= 0) {
      toast.error("Amount must be greater than zero");
      return;
    }

    try {
      await createItem(formData);
      toast.success("Customer added successfully!");
      setFormData({ name: "", phone: "", services: [], amount: "", staff: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add customer!");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>Add Customer</Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        sx={{ mb: 2 }}
        type="tel"
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Services</InputLabel>
        <Select
          multiple
          value={formData.services}
          onChange={handleMultiSelectChange}
          input={<OutlinedInput label="Services" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {serviceOptions.map((service) => (
            <MenuItem key={service} value={service}>
              <Checkbox checked={formData.services.includes(service)} />
              <ListItemText primary={service} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        type="number"
        label="Amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Staff Assisted</InputLabel>
        <Select
          name="staff"
          value={formData.staff}
          onChange={handleChange}
          label="Staff Assisted"
        >
          {staffOptions.map((staff) => (
            <MenuItem key={staff} value={staff}>{staff}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" fullWidth onClick={addItem}>Add</Button>
    </Box>
  );
}

export default Home;
