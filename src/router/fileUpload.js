import express from 'express';
import multer from 'multer';
import  fileUploadController  from '../controller/fileUploadController.js';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Only image files are allowed'), false);  
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/', upload.single('file'), fileUploadController.handleFileUpload);

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send(`Multer error: ${err.message}`);
  } else {
    res.status(400).send(err.message);
  }
});



export default router;