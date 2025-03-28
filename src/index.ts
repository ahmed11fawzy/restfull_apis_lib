import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { dbConnect } from './config/db';
import authRoutes from './Router/authRoutes';

const app = express();

// Connect to MongoDB => then open server
dbConnect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}`);
    });
});

app.use(cors());
app.use(express.json());// for parsing application/json

// Routes
app.use('/api/v1/auth', authRoutes);

// Error handling middleware
app.use((req: any, res: any, next: any) => {
  res.status(404).send('Not Found');
  next();
});


app.use((error: any, req: any, res: any, next: any) => {
  res.status(error.status || 500).json({ data: "error accrued " + error });
  next();
});





