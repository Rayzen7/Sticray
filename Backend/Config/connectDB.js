import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://Rayzen7:yVnzDMIyVzUr1Yqf@rayzen7.tuu1u.mongodb.net/?retryWrites=true&w=majority&appName=Rayzen7");
        console.log("Database Connected");
    } catch (error) {
        console.error(error);
    }
}

export default connectDB