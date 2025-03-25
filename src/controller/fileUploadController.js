import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const handleFileUpload = (req, res) => {
  if (req.file) {
    res.status(200).send({
      message: 'File uploaded successfully!',
      fileName: req.file.filename,
      filePath: path.join(__dirname, '..', 'uploads', req.file.filename)
    });
  } else {
    res.status(400).send({ error: 'No file uploaded' });
  }
};

export default { handleFileUpload };
