import express from 'express';
import { uploadFile, getFiles, deleteFile, getFilesID } from '../Controllers/fileController.js';

const router = express.Router();
// POST
router.post('/upload', uploadFile);
// GET 
router.get('/files', getFiles);

// GET ID
router.get('/files/:id', getFilesID);
// DELETE
router.delete('/files/:id', deleteFile);

export default router;
