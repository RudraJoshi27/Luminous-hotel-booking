# Luminous Logic Hotel Booking 🏨✨

A modern, premium, full-stack web application designed for curated hotel and boutique resort bookings. **Luminous Logic** was built to provide a flawless, high-end user experience focusing on visual excellence, responsive design, and robust backend handling.

## 🚀 Features

- **Premium UI/UX:** A stunning interface featuring glassmorphism, fluid interactive animations, customized SVG iconography, and dynamic gradients.
- **User Authentication:** Complete Login/Signup flows using secure JSON Web Tokens (JWT).
- **Hotel Discovery:** Search, filter, and explore curated trending destinations globally.
- **Booking System:** Seamlessly reserve rooms, select dates, and securely manage your upcoming travel.
- **Host / Admin Dashboard:** Users with Admin privileges can manage platform users, list new properties, and oversee bookings.
- **Responsive Design:** A tailored experience that looks brilliant on 4k desktop monitors and tight mobile screens alike.

## 🛠️ Technology Stack

**Frontend:**
- [React.js](https://reactjs.org/) (Vite)
- React Router (Dynamic Routing)
- Pure Custom Modern CSS Variables (No external UI libraries needed)
- Axios (HTTP Client)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- MongoDB & Mongoose (Database & ORM)
- JSON Web Tokens (Authentication & Role Checking)
- Bcrypt.js (Password Hashing)

## 💻 Getting Started locally

### Prerequisites
Make sure you have Node.js and MongoDB installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com/RUDRA-PARMAR/Luminous-hotel-booking.git
cd Luminous-hotel-booking
```

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following keys:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend Node server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 4. Let's Go!
Open [http://localhost:5173](http://localhost:5173) in your browser. The backend should be running concurrently on `http://localhost:5000`.

## 🎨 Design Philosophy
The core principle behind **Luminous Logic** is to bridge the gap between complex functionality and uncompromised aesthetic beauty. By minimizing our reliance on generic component libraries, we crafted a raw, pixel-perfect CSS design system focused on *light*, *depth*, and *motion*.

---
*Developed with focus and precision.*
