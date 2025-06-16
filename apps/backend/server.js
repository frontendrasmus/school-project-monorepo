import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

// Enable CORS for the frontend
app.use(
  cors({
    origin: 'http://localhost:3000', // Your Next.js frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Hello World endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the node backend!' });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
