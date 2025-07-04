# 🚌 Pakistan Smart Bus Assistant

## 📘 Overview

**Pakistan Smart Bus Assistant** is a full-stack public transport management system built for local city bus services in Pakistan. It allows commuters to check bus routes, schedules, capacity status, and fare details — all **without GPS dependency**. Admins can manage buses, routes, fares, schedules, and receive user complaints through an intuitive panel.

> 🚀 Built using React.js + Django REST + MySQL.

---

## 👨‍💼 Developer Info

- **Name:** Hafiz Ayan Ahmed  
- **University:** NED University of Engineering and Technology  
- **Department:** Computer Engineering, 6th Semester  
- **Role:** Full Stack Developer (React + Django REST + MySQL)

---

## 🎯 Features

### 🧑‍💼 User Panel
- 🔐 User Registration / Login (JWT)
- 🗺️ Search bus routes by source and destination
- 🕒 View route schedules
- 📊 Check real-time bus capacity (Empty / Medium / Full)
- 💸 View fare based on route
- 📢 Receive schedule-based notifications
- 📝 Submit complaints or feedback

### 🛠️ Admin Panel
- ✅ Secure login for admin
- 🚌 Add / Edit / Delete buses and routes
- 🕓 Manage schedules and departure timings
- 📈 Update capacity status manually
- 💵 Manage fare by route
- 📨 Handle user complaints
- 🔔 Send important notifications to users

---

## 🏗️ System Architecture

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | React.js + Tailwind CSS     |
| Backend     | Django REST Framework       |
| Database    | MySQL (via XAMPP)           |
| Auth        | JWT (JSON Web Tokens)       |
| Scheduler   | Django Cron Jobs            |
| Hosting     | Railway / Render / AWS      |

---

## 🧩 Core Modules

- Authentication (JWT)
- Route Search
- Capacity Status
- Fare Display
- Notifications
- Complaints Handling
- Admin Panel
- User Dashboard

---

## 🗄️ Database Design

### Users Table
| Field     | Type           |
|-----------|----------------|
| id        | INT (PK)       |
| name      | VARCHAR        |
| email     | VARCHAR (Unique) |
| phone     | VARCHAR        |
| password  | VARCHAR (hashed) |
| is_admin  | BOOLEAN        |

### Buses Table
| Field            | Type                     |
|------------------|--------------------------|
| id               | INT (PK)                 |
| bus_number       | VARCHAR                  |
| plate_number     | VARCHAR                  |
| capacity         | INT                      |
| current_occupancy| ENUM('Empty','Medium','Full') |
| is_active        | BOOLEAN                  |

### Other Tables:
- **Routes:** id, name, start_point, end_point, total_distance_km, estimated_time_min
- **Schedules:** id, bus_id (FK), route_id (FK), departure_time, weekdays
- **Fares:** id, route_id (FK), fare_amount
- **Complaints:** id, user_id (FK), bus_id (FK), description, status, created_at
- **Notifications:** id, message, created_at

---

## 🧪 Installation (Local)

### Prerequisites:
- Python 3.x
- Node.js
- MySQL + XAMPP
- Git

### 📦 Project Setup for Frontend and Backend
```bash
for backedn
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
for frontend
cd frontend
npm install
npm run dev
