# ⚡ Charging Stations Management App

A full-stack application built with **Node.js**, **Express**, **MongoDB**, and **React** that allows authenticated users to manage EV charging stations.

---

## 🌟 Features

* 🔐 JWT-based authentication (signup/login)
* 🛠️ CRUD operations for charging stations
* 🔎 Filtering by status, power output, and connector type
* 🗺️ Interactive Map View with custom markers (React Leaflet + OpenStreetMap)
* ☁️ Cloud Deployment (Render, Vercel, etc.)

---

## 📁 Project Structure

```
charging-stations-app/
│
├── backend/                        # Node.js + Express + MongoDB API
│   ├── Controllers/
│   │   └── chargingStation.controller.js
│   ├── Models/
│   │   └── chargingStation.model.js
│   ├── Routes/
│   │   └── chargingStation.routes.js
│   ├── Middlewares/
│   │   └── auth.middleware.js
│   ├── server.js
│   └── .env.example
│
├── frontend/                       # React Frontend App
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── IMG/
│   │   │   ├── charging-station.png
│   │   │   └── ev.png
│   │   ├── pages/
│   │   │   ├── AddEditCharger.js
│   │   │   ├── ChargerList.js
│   │   │   └── MapView.js
│   │   ├── styles/
│   │   │   ├── AddEditCharger.css
│   │   │   ├── chargerList.css
│   │   │   └── MapView.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
```

---

## 🔧 Tech Stack

### 🖥️ Backend

* **Node.js**
* **Express.js**
* **MongoDB** (Mongoose ODM)
* **JWT Authentication**
* **bcrypt** (Password hashing)
* **dotenv**, **cors**, **express-validator**

### 🌐 Frontend

* **React** (CRA)
* **React Router DOM**
* **Axios**
* **React Leaflet + Leaflet**
* **OpenStreetMap tiles**
* **Custom CSS**

### ☁️ Deployment

* **Backend**: Render / Railway / Heroku
* **Frontend**: Vercel / Netlify / Firebase Hosting

---

## 🚀 Live Demo

* 🔗 **Frontend**: [frontEnd Deployed Url](https://ev-charge-point-hub-h46m.vercel.app/)
* 🔗 **Backend**: [BackEnd Deployed Url](https://ev-charge-point-hub.vercel.app/)
* 📄 **API Docs / Postman**: \[Link to collection]

---

## 🔐 Authentication Endpoints

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/auth/signup` | Register a new user     |
| POST   | `/api/auth/login`  | Login and receive token |

### ✅ JWT Usage

* Store the token (e.g., `localStorage`)
* Send it in headers for protected routes:

```
Authorization: Bearer <token>
```

Protected Routes:

* `POST /api/chargers`
* `PUT /api/chargers/:id`
* `DELETE /api/chargers/:id`

---

## 🔌 Charging Station API

Base: `/api/chargers`

| Method | Endpoint | Description                        |
| ------ | -------- | ---------------------------------- |
| GET    | `/`      | List all charging stations         |
| POST   | `/`      | Create a new station *(protected)* |
| PUT    | `/:id`   | Update a station *(protected)*     |
| DELETE | `/:id`   | Delete a station *(protected)*     |

### Request Body Example

```json
{
  "name": "Station Name",
  "location": {
    "latitude": 12.9716,
    "longitude": 77.5946
  },
  "status": "Active",
  "powerOutput": 22,
  "connectorType": "CCS"
}
```

### Filters (GET)

You can filter stations by query params:

```
GET /api/chargers?status=Active&powerOutput=22&connectorType=CCS
```

---

## 🧑‍💻 Frontend Pages & Functionality

### 🔐 Login / Signup Page

* Stores JWT on login/signup
* Adds `Authorization` to Axios headers

### 📋 ChargerList (`src/pages/ChargerList.js`)

* Lists all chargers
* Filters:

  * **Status**: All / Active / Inactive
  * **Power Output**: 3.3, 7.2, 11, 22, 50, 100
  * **Connector Type**: Type1 / Type2 / CHAdeMO / CCS / GB/T
* Actions:

  * **Edit** → Navigate to `/chargers/:id`
  * **Delete** → Deletes charger

### ➕ AddEditCharger (`src/pages/AddEditCharger.js`)

* Create or Edit a charging station
* Fields:

  * Name
  * Latitude / Longitude
  * Power Output
  * Connector Type
  * Status

### 🗺️ MapView (`src/pages/MapView.js`)

* Interactive map using **React Leaflet**
* Markers for each charger
* Custom icons (`charging-station.png`)
* Popups show charger details

---

## ⚙️ Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/charging-stations-app.git
cd charging-stations-app
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Run the backend:

```bash
npm start
# Runs on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

Ensure `src/api/axios.js` has:

```js
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
});
```

Run the frontend:

```bash
npm start
# Runs on http://localhost:3000
```

---

## ✅ Key Features Summary

* 🔐 Secure Authentication with JWT & bcrypt
* ⚡ Robust CRUD operations for chargers
* 🔎 Frontend filters (status, power, type)
* 🗺️ Map with interactive popups
* 💡 Responsive and clean UI
* ☁️ Deployed frontend and backend

---

## 📸 Screenshots

> *(Place images in `/public` or `/README-assets/` and reference them here)*

* Login Page
* Charger List + Filters
* Add / Edit Form
* Map View with Markers

---

## 👨‍💼 Author

**Your Name**
📧 [your.email@example.com](mailto:your.email@example.com)
🔗 [LinkedIn](#) | [GitHub](#)

---

## 📄 License

This project is for educational purposes.
Feel free to **fork**, **modify**, and **extend**!

---
