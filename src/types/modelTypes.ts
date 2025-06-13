import mongoose from "mongoose";

export interface User {
    _id?: mongoose.Types.ObjectId;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Video {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoURL: string;
    thumbnail: string;
    controls?: boolean;
    transformations?: {
        height: number;
        width: number;
        quality?: number;
    }
    createdAt?: Date;
    updatedAt?: Date;
}

export interface VideoDimensions {
    height: number;
    width: number;
    quality?: number;
}