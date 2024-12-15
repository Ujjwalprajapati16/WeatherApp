# 🌤️ Weather App

A sleek and modern weather application that provides real-time weather updates for any city worldwide. Built with the latest web technologies, including **React**, **Tailwind CSS**, **Node.js**, and **MongoDB Atlas**. Future-ready with plans to integrate WebSockets for live weather alerts and more advanced features.

---

## 🚀 Features

- **Search for Weather**: Search for weather details by city name.
- **Real-Time Weather Data**: Fetch and display current temperature, humidity, and wind speed.
- **Responsive Design**: Built with Tailwind CSS and DaisyUI for a polished UI across devices.
- **MongoDB Integration**: Save and manage favorite cities (future feature).
- **WebSocket Ready**: Real-time weather updates planned for future versions.

---

## 🛠️ Tech Stack

### **Frontend**
- **React**: UI development.
- **Vite**: Fast and lightweight development server.
- **Tailwind CSS**: Modern utility-first styling.
- **DaisyUI**: Pre-built Tailwind CSS components.

### **Backend**
- **Node.js**: Backend logic and API handling.
- **Express**: Simplified routing and middleware.
- **MongoDB Atlas**: Cloud database to store user data.
- **OpenWeatherMap API**: Fetch weather data.

---

## 📦 Installation

### **Frontend**
1. Clone the repo and navigate to the frontend:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app/weather-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### **Backend**
1. Navigate to the backend directory:
   ```bash
   cd ../weather-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```env
   MONGO_URI=<your_mongo_atlas_connection_string>
   OPENWEATHER_API_KEY=<your_openweathermap_api_key>
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```

---

## 💻 Usage

1. Run the **frontend** and **backend** servers.
2. Open the frontend app in your browser:
   ```
   http://localhost:5173
   ```
3. Search for a city to view its weather details.

---

## 🌟 Future Enhancements

- **WebSocket Integration**: Real-time weather alerts.
- **User Authentication**: Save and manage favorite cities.
- **Charts**: Temperature trends and historical data visualization.
- **Progressive Web App (PWA)**: Offline support.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Feel free to fork the repository, submit pull requests, or report issues. Contributions are always welcome!
