// Data Models
import UserModel from "@/models/users";

// Helper functions
import { ResponseError } from "@/utils/apiHandler";

// Function to register a User
export async function RegisterAndSaveUser(email: string, password: string) {
    // Checking if the user already exists
    const existUser = await UserModel.findOne({ email: email });

    // If exists, return
    if (existUser) return ResponseError(402, `User with ${email} already exists!`);

    // Else create a new user in the database and return the data
    return await UserModel.create({ email, password });
}