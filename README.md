# Salon CRM System

A **Salon CRM (Customer Relationship Management)** web application built with **MERN stack (MongoDB, Express, React, Node.js)**. This system allows salons to manage customers, services, staff, and revenue efficiently with a user-friendly dashboard and visual analytics.

---

## Features

### Customer Management
- Add, edit, and delete customer records.
- Track customer services, staff assisted, and payment amounts.
- Validate phone numbers and service selection.

### Executive Summary
- Overview cards showing:
  - Total Customers
  - Total Revenue
  - Average Bill
  - Active Staff
- Responsive, visually appealing cards with glassy effect.

### Analytics & Reports
- Charts to visualize:
  - Customers per staff
  - Peak hours (hourly customer count)
  - Services usage trends
  - Daily/weekly revenue
- Fully responsive and interactive charts using **Recharts**.

### Data Management
- Seed database with realistic test data.
- Randomized timestamps for analytics.
- Ability to keep old data and add new test data.

### Tech Stack
- **Frontend:** React, Material-UI (MUI), Recharts, React Toastify  
- **Backend:** Node.js, Express  
- **Database:** MongoDB, Mongoose  
- **Environment Variables:** Managed via `.env`  

### Installation

1. Clone the repository:
```bash
git clone https://github.com/<your-username>/saloon-crm.git

Navigate to the project folder:

cd saloon-crm


Install dependencies for backend and frontend:

# Backend
cd server
npm install

# Frontend
cd ../client
npm install


Create a .env file in the server folder and add:

MONGO_URI=<your_mongodb_connection_string>
PORT=5000


# Seed the database with sample data (optional):
cd server
node seed.js


Start the application:

# Backend
npm run dev

# Frontend
cd ../client
npm start


The app should now be running on http://localhost:3000.