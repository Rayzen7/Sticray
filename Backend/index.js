import express from 'express';
import cors from 'cors';
import connectDB from './Config/connectDB.js';
import router from './Routes/fileRoute.js';
import adminRoute from './Routes/adminRoute.js';

const app = express();

connectDB();
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use('/api', adminRoute);

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});