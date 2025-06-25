# 🌿 Green Thumb Intelligence - Plant Care Application

## 📚 Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Usage](#usage)

---

## 📝 Description

**Green Thumb Intelligence** is a full-stack **MERN** application tailored for plant enthusiasts to track, manage, and share their plant care routines. The platform combines intelligent plant care with social features to build a connected plant-loving community. Key capabilities include:

* Add and manage personal plant collections
* Assess plant health and identify species using the **Plant.id API**
* Search plant details and care instructions
* Record and monitor plant care history (watering, fertilizing, etc.)
* Find friends, create posts, and engage with the plant community

---

## 🚀 Features

* 🔐 User authentication (signup/login) with JWT
* 🌱 Add, view, and manage plant profiles
* 📷 Plant health assessment and identification via **Plant.id API**
* 🔍 Search plant information by image or text
* 📘 Track and update plant care history
* 👥 Friend system to connect with other users
* 🗨️ Create and interact with posts in a plant-sharing community
* 📱 Fully responsive design for all device sizes

---

## 🛠️ Technologies

### 🔹 Frontend

* React.js
* Material-UI (MUI)
* Apollo Client
* GraphQL
* JWT Authentication

### 🔸 Backend

* Node.js
* Express.js
* MongoDB
* Mongoose ODM
* GraphQL
* JSON Web Tokens (JWT)

### 🌐 External APIs

* [Plant.id API](https://web.plant.id/) – for plant identification and health assessment

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SangaviGR/Green-Thumb-Intelligence.git
   cd Green-Thumb-Intelligence
   ```

2. Install dependencies:

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables in the `server/.env` file:

   ```
   SECRET_KEY=your-secret-key
   MONGODB_URI=your-mongodb-connection-string
   ```

---

## ▶️ Usage

1. Start the backend server:

   ```bash
   cd server
   npm start
   ```

2. In a separate terminal, start the frontend:

   ```bash
   cd client
   npm start
   ```

3. Visit the app at:

   ```
   http://localhost:3000
   ```

---

## 🌟 Summary

Green Thumb Intelligence empowers plant lovers to:

* Record and monitor their plant’s growth journey
* Identify plant species and access care info via **Plant.id API**
* Build a social network around plant care and wellness

---
