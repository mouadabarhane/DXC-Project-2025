<a id="readme-top"></a>


# 📦 DXC Project 2025 – OMT Order Management System

Welcome to the **Order Management Tool (OMT)** developed as part of the **DXC PFE 2025 Internship Program**. This web application provides an end-to-end solution for managing telecom product specifications, offerings, and customer orders. It integrates a **Next.js front-end** with a **ServiceNow back-end**, enabling seamless synchronization and efficient workflow automation.

---

## 🌐 Technologies Used

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]  
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]
* [![ServiceNow][ServiceNow.com]][ServiceNow-url]
* [![Docker][Docker.com]][Docker-url]
* [![Express.js][Express.js]][Express-url]
* [![Node.js][Node.js]][Node-url]
* [![TypeScript][TypeScript-lang]][TypeScript-url]
* [![Tailwind CSS][TailwindCSS.com]][Tailwind-url]


---

## Step 1: 🛠 How to Run the Project

### 1. Start the Server

Go to the `server` folder and run the following commands:

```sh
npm i
npm run server
```

---


### 2. Start the Client

Go to the `server` folder and run the following commands:

```sh
npm i
npm run dev
```

---

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

---

## Step 3:

### Send a POST request to:
```sh
http://localhost:{your-port}/api/users
```

###  Sample JSON:
```sh
{
  "userID": "yourname",
  "password": "yourpassword",
  "profile": "yourprofile",
  "username": "yourusername",
  "role": "yourrole"
}
```
✅ Valid profiles: "Administrator", "Product Offering Manager", "Commercial Agent"
---










