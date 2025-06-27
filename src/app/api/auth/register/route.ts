// Next imports
import { NextRequest, NextResponse } from "next/server";

// Helper functions
import { ResponseError, ResponseSuccess } from "@/utils/apiHandler";

// Libs
import { dbConnect } from "@/lib/db";

// Services
import { RegisterAndSaveUser } from "@/services/authServices";

// Types
import { APIResponse } from "@/types";

export async function POST(request: NextRequest): Promise<NextResponse<APIResponse>> {
    const { email, password } = await request.json();  // extracting email & password from request

    // Validating email and password
    if (!email || !password) {
        return ResponseError(400, "All fields are required!");
    }

    try {
        await dbConnect();  // connecting to the database

        // Creating & saving a new user into DB with Register Service
        const newUser = await RegisterAndSaveUser(email, password);

        // Return the new user on successful registration
        return ResponseSuccess(200, newUser);
    } catch (error) {
        console.log("Error registering user :", error);
        return ResponseError(400, 'Registration failed!');
    }
}