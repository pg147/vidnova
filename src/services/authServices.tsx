// Modules
import bcrypt from "bcryptjs";

// Data Models
import UserModel from "@/models/users";

// Types
import { User } from "@/types";

// Function to register a User
export async function RegisterAndSaveUser(email: string, password: string): Promise<User> {
    // Checking if the user already exists
    const existUser = await UserModel.findOne({ email: email });

    // If exists, throw an error
    if (existUser) throw new Error(`User with ${email} already exists!`);

    // Else create a new user in the database and return the data
    return await UserModel.create({ email, password });
}

// Function to authorize and log in a User
export async function AuthorizeAndLoginUser(email: string, password: string): Promise<User> {
    // Searching the user in the database
    const user = await UserModel.findOne({ email: email });

    // If user not found, throw an error
    if (!user) throw new Error(`User with ${email} not found!`);

    // Comparing the input password with the saved password
    const checkPassword = await bcrypt.compare(password, user?.password);

    // If the password check fails, throw an error
    if (!checkPassword) throw new Error('Invalid password!');

    // If found return user, without the password (secured)
    return user.select("-password");
}