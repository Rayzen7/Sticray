import multer from 'multer';
import { storage } from '../firebase.js';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; 
import File from '../Models/file.js'; 

// Set up Multer to store files in memory
const multerStorage = multer.memoryStorage();
const upload = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true); 
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    },
});

// POST
export const uploadFile = (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { title, descripcion, price } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const storageRef = ref(getStorage(), `files/${uuidv4()}_${file.originalname}`);

        try {
            const snapshot = await uploadBytes(storageRef, file.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const newFile = new File({
                title,
                descripcion,
                price,
                fileName: downloadURL,
            });
            await newFile.save();

            res.status(201).json(newFile);
        } catch (error) {
            res.status(500).json({ message: 'File upload failed', error: error.message });
        }
    });
};


// GET ID
export const getFilesID = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(200).json(file);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ message: 'Failed to fetch file', error: error.message });
    }
};

// GET
export const getFiles = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const file = await File.findById(id);
            if (!file) {
                return res.status(404).json({ message: 'File not found' });
            }
            res.status(200).json(file);
        } else {
            const files = await File.find();
            res.status(200).json(files);
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch files', error: error.message });
    }
};

// DELETE 
export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        const storageRef = ref(storage, file.fileName);

        await deleteObject(storageRef);
        await File.findByIdAndDelete(id);
        res.status(200).json({ message: 'File Success Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove file', error: error.message });
    }
};