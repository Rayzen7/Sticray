import Admin from "../Models/user.js"; 
import bcrypt from 'bcryptjs';

// Register
export const register = async(req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).json({ message: "User and password are required" });
    }
    try {
        const existingUser = await Admin.findOne({ user });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new Admin({ user, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "Registration successful", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Registration Failed", error });
    }
};


// Login
export const login = async(req, res) => {
    const { user, password } = req.body; 
    try {
        const User = await Admin.findOne({ user }); 
        // User not found
        if(!User) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Wrong password
        const isPasswordValid = await bcrypt.compare(password, User.password);
        if(!isPasswordValid) {
            return res.status(404).json({ message: "Wrong Password" });
        }

        res.status(200).json({ message: "Login Success" });
    } catch (error) {
        res.status(500).json({ message: "Login Failed", error });
    }
}
