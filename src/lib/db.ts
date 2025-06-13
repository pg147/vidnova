// Mongoose imports
import { connect } from "mongoose";

// Types
import { MongooseConnection } from "@/types";

// Initialized object to maintain a connection state
const connection: MongooseConnection = {};

export async function dbConnect(): Promise<void> {
    try {
        const db = await connect(process.env.NEXT_MONGODB_URI! || "");

        connection.isConnected = db.connections[0].readyState; // updating connection state
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
            process.exit(1);
        } else {
            console.log('An unknown error occurred');
            process.exit(1);
        }
    }
}