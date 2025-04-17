# 📦 DXC Project 2025 – OMT Order Management System

Welcome to the **Order Management Tool (OMT)** developed as part of the **DXC PFE 2025 Internship Program**. This web application provides an end-to-end solution for managing telecom product specifications, offerings, and customer orders. It integrates a **React.js front-end** with a **ServiceNow back-end**, enabling seamless synchronization and efficient workflow automation.

---

## 🌐 Technologies Used

- **Front-end**: React.js, Next.js
- **Back-end**: Node.js, Express.js, MongoDB
- **Platform Integration**: ServiceNow API
- **Authentication**: JWT-based secure login system
- **Dev Tools**: Git, Postman, VS Code

---

## Step 1: 🛠 How to Run the Project

### 1. Start the Server

Go to the `server` folder and run the following commands:

```bash
npm i
npm run server


### 2. Start the Client

Go to the `server` folder and run the following commands:

```bash
npm i
npm run dev

## Step 2:

### Make sure to add a .env file inside the server/ folder with the following variables:

DATABASE_URL=
JWTPRIVATEKEY=
SALT_KEY=10
PORT=
INSTANCE_URL=
SERVICENOW_USERNAME=
SERVICENOW_PASSWORD=



### Add a .env file in the client/ folder with these variables:

DATABASE_URL=
NEXT_PUBLIC_INSTANCE_URL= 
NEXT_PUBLIC_AXIOS_URL=

## Step 3:

### Send a POST request to:
http://localhost:{your-port}/api/users

###  Sample JSON:
{
  "userID": "yourname",
  "password": "yourpassword",
  "profile": "Administrator",
  "username": "yourusername",
  "role": "yourrole"
}

✅ Valid profiles: "Administrator", "Product Offering Manager", "Commercial Agent"








