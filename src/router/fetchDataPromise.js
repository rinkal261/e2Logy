import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/', (req, res) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).send("Error fetching data");
    });
});

export default router;
