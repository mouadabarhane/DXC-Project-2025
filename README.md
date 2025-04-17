<a id="readme-top"></a>


# 📦 DXC Project 2025 – OMT Order Management System

Welcome to the **Order Management Tool (OMT)** developed as part of the **DXC PFE 2025 Internship Program**. This web application provides an end-to-end solution for managing telecom product specifications, offerings, and customer orders. It integrates a **Next.js front-end** with a **ServiceNow back-end**, enabling seamless synchronization and efficient workflow automation.

---

## 🌐 Technologies Used

* [![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
* [![React](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
* [![Bootstrap](https://img.shields.io/badge/Bootstrap-purple?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
* [![jQuery](https://img.shields.io/badge/jQuery-lightblue?style=for-the-badge&logo=jquery&logoColor=white)](https://jquery.com/)
* [![ServiceNow](https://img.shields.io/badge/ServiceNow-green?style=for-the-badge&logo=servicenow&logoColor=white)](https://www.servicenow.com/)
* [![Docker](https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
* [![Express.js](https://img.shields.io/badge/Express.js-grey?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
* [![Node.js](https://img.shields.io/badge/Node.js-darkgreen?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
* [![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
* [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-teal?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
* [![MongoDB](https://img.shields.io/badge/MongoDB-darkgreen?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
* [![Postman](https://img.shields.io/badge/Postman-orange?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)
* [![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)



---

## Step 1: 🛠 How to Run the Project

### 1. Start the Server

Go to the `server` folder and run the following commands:

```sh
npm i
npm run dev
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

```sh
DATABASE_URL=
JWTPRIVATEKEY=
SALT_KEY=10
PORT=
INSTANCE_URL=
SERVICENOW_USERNAME=
SERVICENOW_PASSWORD=
```


### Add a .env file in the client/ folder with these variables:

```sh
DATABASE_URL=
NEXT_PUBLIC_INSTANCE_URL= 
NEXT_PUBLIC_AXIOS_URL=
```

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










