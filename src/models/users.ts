// Mongoose Imports
import { Schema, model, models } from "mongoose";

// Dependencies
import bcrypt from "bcryptjs";

// Types
import { User } from "@/types";

// Schema definition for User
const userSchema = new Schema<User>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Pre-hook to Hash password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

// Checking if the model pre-exists, if not, create a new one
const UserModel = models?.Users || model<User>("Users", userSchema);

export default UserModel;