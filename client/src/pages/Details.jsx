import { useEffect, useState } from "react";
import { fetchItems, deleteItem, updateItem } from "../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { toast } from "react-toastify";

const staffOptions = ["staff1", "staff2"];
const serviceOptions = [
  "Hair Cutting",
  "Hair Trimming",
  "Shaving & Beard Grooming",
  "Head Massage",
  "Waxing",
  "Steam Therapy",
];

function Details() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterStaff, setFilterStaff] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const loadItems = async () => {
    try {
      const { data } = await fetchItems();
      setItems(data);
    } catch (error) {
      toast.error("Failed to fetch items");
      console.error(error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const removeItem = async (id) => {
    try {
      await deleteItem(id);
      toast.success("Item deleted successfully");
      loadItems();
    } catch (error) {
      toast.error("Failed to delete item");
      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredItems = filterStaff
    ? items.filter((item) => item.staff === filterStaff)
    : items;

  const handleEditOpen = (item) => {
    setEditData(item);
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleMultiSelectChange = (e) => {
    const { value } = e.target;
    setEditData({ ...editData, services: typeof value === "string" ? value.split(",") : value });
  };

  const handleEditSave = async () => {
    try {
      await updateItem(editData._id, editData);
      toast.success("Item updated successfully");
      setEditOpen(false);
      loadItems();
    } catch (error) {
      toast.error("Failed to update item");
      console.error(error);
    }
  };

  return (
    <>
      <Paper sx={{ mt: 5, maxWidth: "95%", mx: "auto", p: 2, overflowX: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Customers List
        </Typography>

        <FormControl sx={{ mb: 2, minWidth: 200 }}>
          <InputLabel>Filter by Staff</InputLabel>
          <Select
            value={filterStaff}
            onChange={(e) => setFilterStaff(e.target.value)}
            label="Filter by Staff"
          >
            <MenuItem value="">All</MenuItem>
            {staffOptions.map((staff) => (
              <MenuItem key={staff} value={staff}>{staff}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Staff Assisted</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.services.join(", ")}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.staff}</TableCell>
                    <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1, mb: { xs: 1, sm: 0 } }}
                        onClick={() => handleEditOpen(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => removeItem(item._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Edit Dialog */}
      <Dialog fullWidth maxWidth="sm" open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField label="Name" name="name" value={editData.name || ""} onChange={handleEditChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Phone" name="phone" value={editData.phone || ""} onChange={handleEditChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Amount" name="amount" value={editData.amount || ""} onChange={handleEditChange} fullWidth type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Staff Assisted</InputLabel>
                <Select name="staff" value={editData.staff || ""} onChange={handleEditChange} label="Staff Assisted">
                  {staffOptions.map((staff) => (
                    <MenuItem key={staff} value={staff}>{staff}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Services</InputLabel>
                <Select
                  multiple
                  value={editData.services || []}
                  onChange={handleMultiSelectChange}
                  input={<OutlinedInput label="Services" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {serviceOptions.map((service) => (
                    <MenuItem key={service} value={service}>
                      <Checkbox checked={(editData.services || []).includes(service)} />
                      <ListItemText primary={service} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Details;
