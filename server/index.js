import express from 'express';
import userRoutes from './src/routes/user.js'; // Ensure this path is correct
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
import dotenv from 'dotenv';
import connect from './src/db/connect.js';

connect();
dotenv.config();

const port = process.env.PORT || 8080;

app.use(userRoutes);
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});