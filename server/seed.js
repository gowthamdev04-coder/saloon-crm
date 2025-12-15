import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/Item.js";

dotenv.config();

const data = [
  { name: "John Doe", phone: "9876543210", services: ["cutting"], amount: 200, staff: "staff1" },
  { name: "Jane Smith", phone: "8765432109", services: ["shaving", "wax"], amount: 350, staff: "staff2" },
  { name: "Alice", phone: "7654321098", services: ["steam", "head massage"], amount: 500, staff: "staff1" },
  { name: "Bob Johnson", phone: "6543210987", services: ["trimming"], amount: 150, staff: "staff2" },
  { name: "Charlie Brown", phone: "5432109876", services: ["cutting", "shaving"], amount: 300, staff: "staff1" },
  { name: "Diana Prince", phone: "4321098765", services: ["wax"], amount: 400, staff: "staff2" },
  { name: "Ethan Hunt", phone: "3210987654", services: ["head massage", "steam"], amount: 500, staff: "staff1" },
  { name: "Fiona Gallagher", phone: "2109876543", services: ["trimming"], amount: 200, staff: "staff2" },
  { name: "George Martin", phone: "1098765432", services: ["cutting"], amount: 250, staff: "staff1" },
  { name: "Hannah Baker", phone: "9988776655", services: ["shaving", "wax"], amount: 350, staff: "staff2" },
  { name: "Ian Curtis", phone: "8877665544", services: ["steam"], amount: 400, staff: "staff1" },
  { name: "Jack Sparrow", phone: "7766554433", services: ["cutting", "trimming"], amount: 300, staff: "staff2" },
  { name: "Karen Page", phone: "6655443322", services: ["head massage"], amount: 450, staff: "staff1" },
  { name: "Leo Messi", phone: "5544332211", services: ["wax"], amount: 500, staff: "staff2" },
  { name: "Mia Wallace", phone: "4433221100", services: ["steam", "shaving"], amount: 350, staff: "staff1" },
  { name: "Nathan Drake", phone: "3322110099", services: ["cutting"], amount: 200, staff: "staff2" },
  { name: "Olivia Pope", phone: "2211009988", services: ["trimming", "wax"], amount: 400, staff: "staff1" },
  { name: "Peter Parker", phone: "1100998877", services: ["head massage"], amount: 450, staff: "staff2" },
  { name: "Quinn Fabray", phone: "9988112233", services: ["cutting", "shaving"], amount: 300, staff: "staff1" },
  { name: "Rachel Green", phone: "8877001122", services: ["steam"], amount: 350, staff: "staff2" },
  { name: "Steve Rogers", phone: "7766002211", services: ["wax", "trimming"], amount: 400, staff: "staff1" },
  { name: "Tony Stark", phone: "6655001122", services: ["cutting"], amount: 250, staff: "staff2" },
  { name: "Uma Thurman", phone: "5544002211", services: ["head massage"], amount: 500, staff: "staff1" },
  { name: "Victor Stone", phone: "4433001122", services: ["shaving", "wax"], amount: 350, staff: "staff2" },
  { name: "Wanda Maximoff", phone: "3322001122", services: ["steam"], amount: 450, staff: "staff1" },
   { name: "Xander Cage", phone: "2211998877", services: ["cutting", "trimming"], amount: 300, staff: "staff2" },
  { name: "Yara Greyjoy", phone: "1100887766", services: ["head massage"], amount: 400, staff: "staff1" },
  { name: "Zoe Barnes", phone: "9988773344", services: ["shaving"], amount: 250, staff: "staff2" },
  { name: "Aaron Taylor", phone: "8877662233", services: ["wax", "steam"], amount: 450, staff: "staff1" },
  { name: "Betty Cooper", phone: "7766551122", services: ["cutting"], amount: 200, staff: "staff2" },
  { name: "Caleb Rivers", phone: "6655440011", services: ["head massage", "trimming"], amount: 350, staff: "staff1" },
  { name: "Dana Scully", phone: "5544331122", services: ["wax"], amount: 400, staff: "staff2" },
  { name: "Elliot Alderson", phone: "4433220011", services: ["steam", "shaving"], amount: 500, staff: "staff1" },
  { name: "Felicity Smoak", phone: "3322112233", services: ["cutting", "head massage"], amount: 350, staff: "staff2" },
  { name: "Gordon Freeman", phone: "2211003344", services: ["trimming"], amount: 250, staff: "staff1" }
];


const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Item.deleteMany({}); // Clear existing
    await Item.insertMany(data);
    console.log("Test data inserted!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
