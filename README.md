# 📝 Simple Blog Website (MERN Stack)

## 🌐 Overview
This is a **Simple Blog Website** built using the **MERN stack (MongoDB, Express.js, React.js, and Node.js)**.  
It allows users to **read blogs**, and **login to write their own blogs**.

---

## 🚀 Features
- 📰 **Read Blogs:** Browse through blogs written by other users.
- ✍️ **Write Blogs:** Authenticated users can write and publish their own blogs.
- 🔐 **User Authentication:** Secure login and signup functionality.
- 🧭 **Responsive Design:** Works smoothly on desktop and mobile devices.
- 💾 **MongoDB Database:** Stores all user data and blog content securely.

---

## 🛠️ Tech Stack
| Component | Technology Used |
|------------|----------------|
| Frontend  | React.js, CSS, Axios |
| Backend   | Node.js, Express.js |
| Database  | MongoDB, Mongoose |
| Authentication | JWT (JSON Web Token) |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/nileshkumaryadav1/blogapp-frontend.git
cd simple-blog-mern
```

### 2️⃣ Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file inside the **server** folder and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the App
```bash
# Run backend
cd server
npm start

# Run frontend
cd ../frontend
npm start
```

Now visit 👉 **http://localhost:3000** to see the app in action!

---

## 🧩 Folder Structure
```
simple-blog-mern/
│
├── client/         # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/         # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── package.json
│
└── README.md
```

---

## 📸 Screenshots (Optional)
_Add your app screenshots here (Home page, Blog page, Login page, etc.)_

---

## 🤝 Contributing
Contributions are welcome!  
Feel free to fork this repo, open issues, and submit pull requests.

---

## 📜 License
This project is licensed under the **MIT License** – see the LICENSE file for details.

---

## 👨‍💻 Author
**Nilesh Kumar**  
📧 nileshkumarextra@gmail.com  
🌍 [GitHub Profile](https://github.com/nileshkumaryadav1)

---

⭐ If you like this project, don't forget to **star** the repo!

