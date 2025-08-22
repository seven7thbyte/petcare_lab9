# 🐾 PetCare - Pet Adoption & Welfare System

**PetCare** is a full-stack web application that allows users to register with profile pictures, receive email confirmations, and manage pet data (add, edit, delete, view pets). It uses a MySQL database hosted on **Aiven** and is fully deployed on **Render**.

---

## Live Demo

🔗 https://petcare-lab9.onrender.com

---

## Features

- **User Registration** with:
  - Name, Email, Phone, Profile Picture Upload
  - Email Confirmation using Nodemailer
- **User Login** and view all registered users
- **CRUD Operations for Pets**:
  - Add Pet
  - Edit Pet
  - Delete Pet
  - View All Pets
- File Upload with **Multer**
- Email Confirmation via **Nodemailer**
- MySQL Database hosted on **Aiven**
- Full deployment via **Render**

---

## Tech Stack

Layer     : Technology               

Frontend  : HTML5, Tailwind CSS, JS   
Backend   : Node.js, Express.js       
Database  : MySQL (hosted on Aiven)   
File Upload : Multer                  
Email     : Nodemailer               
Hosting   : Render.com               

---

## Folder Structure

```
petcare/
├── public/
│   ├── assets/
│   ├── login.html
│   ├── dashboard.html
│   ├── sign.css
│   └── login.js
├── dashboard.js
├── routes/
│   ├── userRoutes.js
│   └── petRoutes.js
├── uploads/             # Uploaded profile pictures
├── server.js            # Main server file
├── db/
│   └── db.js            # MySQL connection config
├── .env                 # Environment variables
├── package.json
└── README.md
```

## .env file

```
PORT=3000  
DB_HOST=your-aiven-mysql-host  
DB_USER=avnadmin  
DB_PASSWORD=your-db-password  
DB_NAME=petcare  
EMAIL_USER=your-email@gmail.com  
EMAIL_PASS=your-email-password
```

## Install

```bash
npm init -y
npm install dotenv express mysql2 cors multer nodemailer fs path nodemon
```

## Start Server

```bash
npm run dev
```
