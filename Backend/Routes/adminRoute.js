import { register, login } from "../Controllers/adminController.js";
import express from 'express';

const adminRoute = express.Router();

adminRoute.post('/adminRegister', register);
adminRoute.post('/adminLogin', login);

export default adminRoute;