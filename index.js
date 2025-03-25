import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import fileUploadRoutes from "./src/router/fileUpload.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/upload", fileUploadRoutes);

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

app.get('/data', (req, res) => {
    res.json({ message: 'Data fetched successfully' });
  });

  const users1 = [
    { username: 'admin', password: 'password123' }
    ];
    
    app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users1.find(u => u.username === username && u.password === password);
    
    if (user) {
    res.json({ message: 'Login successful' });
    } else {
    res.status(400).json({ message: 'Invalid credentials' });
    }
    });
    

app.get("/users", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.query.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

//curl command   curl.exe -X POST -F "file=@C:\Users\rinka\Desktop\e2logy\demo.jpg" http://localhost:3000/upload

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});