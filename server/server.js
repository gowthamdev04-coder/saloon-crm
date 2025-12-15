import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import itemRoutes from "./routes/itemRoutes.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/items", itemRoutes);


const PORT = process.env.PORT || 5005;

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("MongoDB connected"))
    .catch((error) =>console.error("ERROR OCCURED", error));
    
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(PORT,() =>{
    console.log(`Server is running on PORT: ${PORT}`);
})
