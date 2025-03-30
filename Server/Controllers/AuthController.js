import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// register new users
export const registerUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Check if user already exists
        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "This User already exists!" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        let pass = password.toString();
        const hashedPass = await bcrypt.hash(pass, parseInt(salt));
        req.body.password = hashedPass;

        // Create new user
        const newUser = new UserModel(req.body);
        const user = await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, id: user._id }, 
            process.env.JWT_KEY || 'MERN-SECRET-KEY', 
            { expiresIn: '1h' }
        );

        res.status(200).json({ user, token });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: error.message });
    }
}


// Login users

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });

        if (user) {
            const validity = await bcrypt.compare(password, user.password)

            if (!validity) {
                res.status(400).json("Sorry, Please enter the correct email or password!");
            } else {
                const token = jwt.sign(
                    { email: user.email, id: user._id }, 
                    process.env.JWT_KEY || 'MERN-SECRET-KEY', 
                    { expiresIn: '1h' }
                );
                res.status(200).json({ user, token });
            }
        } else {
            res.status(404).json("Sorry, Please enter the correct email or password!")
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: error.message })
    }
}