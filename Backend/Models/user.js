import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

const admin = mongoose.model('Admin', adminSchema);
export default admin;