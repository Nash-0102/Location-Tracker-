

# 📍 Real-Time Location Tracking System

A real-time GPS location tracker built using **Node.js**, **Express**, **Socket.IO**, and **Leaflet.js**.
It continuously tracks a user's live position using the browser's Geolocation API and updates the location on an interactive map in real time.

---

## ⭐ Features

* 🚀 **Real-time communication** using Socket.IO
* 🌍 **Live GPS tracking** with continuous updates
* 🗺 **Interactive map** using OpenStreetMap + Leaflet
* 📡 **Broadcast system** to show location of multiple users
* ❌ **Auto remove marker** when a user disconnects
* 📱 Mobile-friendly (high accuracy on smartphones)
* 🖥 Works on localhost with laptop/mobile

---

## 🛠 Tech Stack

**Frontend**

* HTML, CSS, JavaScript
* Leaflet.js (Maps)
* Socket.IO Client

**Backend**

* Node.js
* Express.js
* Socket.IO Server

---

## 📦 Installation & Setup

### 1️⃣ Clone Repo

```sh
git clone <your-repo-url>
cd your-project-folder
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Start Server

```sh
node app.js
```

### 4️⃣ Open in Browser

```
http://localhost:3000
```

---

## 📡 How It Works

### 🔹 **Frontend**

1. Browser asks for GPS permission
2. `navigator.geolocation.watchPosition()` tracks live movement
3. Every update is sent to server using

   ```js
   socket.emit("send-location", { latitude, longitude });
   ```
4. Server broadcasts location to all connected clients
5. Leaflet map updates or creates markers

### 🔹 **Backend**

* Receives location from one user
* Emits updated position to **all** users
* Removes marker when user disconnects

---

## 🧩 Project Structure

```
project/
│── app.js            # Server + Socket.IO backend
│── package.json
│── views/
│   └── index.ejs     # Frontend UI
│── public/
│   ├── js/
│   │   └── script.js # Client code with map + socket
│   └── css/
│       └── style.css
```

---

## 🗺 API & Event Flow

### 🔸 Client → Server

| Event Name      | Description                |
| --------------- | -------------------------- |
| `send-location` | Sends latitude & longitude |

### 🔸 Server → Everyone

| Event Name          | Description                       |
| ------------------- | --------------------------------- |
| `receive-location`  | Broadcasts updated user location  |
| `user-disconnected` | Removes marker when a user leaves |

---

## 📱 Accuracy Notes

* **Mobile devices** give the best GPS accuracy
* **Laptops/PCs do NOT contain GPS chips**
* Desktop location accuracy depends on:

  * WiFi router location
  * IP geolocation
  * Google WiFi database
  * Chrome high accuracy settings

For best results, open on mobile:

```
http://<your-computer-ip>:3000
```

---

## 🛡 Permissions Required

Browser will prompt:

```
Allow this site to access your location?
```

You must click **Allow** to enable GPS tracking.

---

## 🧪 Troubleshooting

### ❗ Wrong location showing?

* This is normal on laptops (no GPS chip)
* Test on mobile for perfect accuracy

### ❗ Map not loading?

Check console:

* CORS errors
* Tile URL correctness
* Internet connectivity

### ❗ Marker not updating?

Ensure `send-location` and `receive-location` event names match

---

## 📜 License

This project is open-source.
Feel free to use, modify, or extend it.

---

## 🙌 Author

**Nashit Ansari**
Real-time tracking system using Node.js + Socket.IO

---
