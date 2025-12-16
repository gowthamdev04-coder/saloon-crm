import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/Item.js";

dotenv.config();

const servicesList = [
  "cutting",
  "shaving",
  "wax",
  "steam",
  "head massage",
  "trimming",
];

const staffs = ["staff1", "staff2"];

// 👉 Generate random date (last 30 days, realistic hours)
// 👉 Generate random date between 3 to 30 days ago
const randomDate = () => {
  const end = new Date();
  end.setDate(end.getDate() - 2); // ⛔ stop at 2 days ago

  const start = new Date();
  start.setDate(start.getDate() - 30); // ✅ start 30 days ago

  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  // Salon working hours: 9 AM – 9 PM
  date.setHours(9 + Math.floor(Math.random() * 12));
  date.setMinutes(Math.floor(Math.random() * 60));
  date.setSeconds(0);

  return date;
};


const generateData = (count = 10) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    const shuffledServices = [...servicesList].sort(() => 0.5 - Math.random());

    const createdAt = randomDate();

    result.push({
      name: `Customer ${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
      services: shuffledServices.slice(0, 2),
      amount: Math.floor(150 + Math.random() * 400),
      staff: staffs[Math.floor(Math.random() * staffs.length)],
      createdAt,
      updatedAt: createdAt,
    });
  }

  return result;
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const newData = generateData(10); // 👈 adds 10 NEW records
    await Item.insertMany(newData);

    console.log("✅ New test data added successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
