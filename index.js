import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import fileUploadRoutes from "./src/router/fileUpload.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", fileUploadRoutes);

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

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