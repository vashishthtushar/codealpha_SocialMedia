import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


// get All users
export const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find();

        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            return otherDetails;
        })

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).json({ message: "Server error while fetching users", error: error.message });
    }
}



// get a user
export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        // Validate if id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await UserModel.findById(id);

        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error while fetching user", error: error.message });
    }
}


//Update a user

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { _id, password } = req.body;

    try {
        // Validate if id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        if (id === _id) {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                let pass = password.toString();
                req.body.password = await bcrypt.hash(pass, salt);
            }

            try {
                const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
                
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                const token = jwt.sign(
                    { email: user.email, id: user._id },
                    process.env.JWT_KEY
                );

                res.status(200).json({ user, token });
            } catch (error) {
                console.error("Error updating user:", error);
                res.status(500).json({ message: "Server error while updating user", error: error.message });
            }
        } else {
            res.status(403).json({ message: "Access Denied! You can only update your own profile" });
        }
    } catch (error) {
        console.error("Error in update user process:", error);
        res.status(500).json({ message: "Server error in update process", error: error.message });
    }
}



// Delete a User

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const { _id, currentUserAdminStatus } = req.body;

    try {
        // Validate if id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        if (_id === id || currentUserAdminStatus) {
            try {
                const user = await UserModel.findByIdAndDelete(id);
                
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                
                res.status(200).json({ message: "User deleted successfully" });
            } catch (error) {
                console.error("Error deleting user:", error);
                res.status(500).json({ message: "Server error while deleting user", error: error.message });
            }
        } else {
            res.status(403).json({ message: "Access Denied! You can only delete your own profile" });
        }
    } catch (error) {
        console.error("Error in delete user process:", error);
        res.status(500).json({ message: "Server error in delete process", error: error.message });
    }
}



// Follow a User

export const followUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;

    try {
        // Validate if ids are valid MongoDB ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        if (_id === id) {
            return res.status(403).json({ message: "Action forbidden: You cannot follow yourself" });
        }

        const followUser = await UserModel.findById(id);
        const followingUser = await UserModel.findById(_id);

        if (!followUser || !followingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!followUser.followers.includes(_id)) {
            await followUser.updateOne({ $push: { followers: _id } });
            await followingUser.updateOne({ $push: { following: id } });
            res.status(200).json({ message: "User followed successfully" });
        } else {
            res.status(400).json({ message: "User is already followed by you" });
        }
    } catch (error) {
        console.error("Error in follow user process:", error);
        res.status(500).json({ message: "Server error in follow process", error: error.message });
    }
}



// UnFollow a User

export const UnFollowUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;

    try {
        // Validate if ids are valid MongoDB ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        if (_id === id) {
            return res.status(403).json({ message: "Action forbidden: You cannot unfollow yourself" });
        }

        const followUser = await UserModel.findById(id);
        const followingUser = await UserModel.findById(_id);

        if (!followUser || !followingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (followUser.followers.includes(_id)) {
            await followUser.updateOne({ $pull: { followers: _id } });
            await followingUser.updateOne({ $pull: { following: id } });
            res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            res.status(400).json({ message: "User is not followed by you" });
        }
    } catch (error) {
        console.error("Error in unfollow user process:", error);
        res.status(500).json({ message: "Server error in unfollow process", error: error.message });
    }
}
