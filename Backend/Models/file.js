import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
});

const File = mongoose.model('File', fileSchema);
export default File;