import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    services: [{ type: String }], // array of strings
    amount: { type: Number },
    staff: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
