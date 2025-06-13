// Mongoose Imports
import { Schema, model, models } from "mongoose";

// Constants
import { VIDEO_DIMENSIONS } from "@/constants";

// Types
import { Video } from "@/types";

// Schema definition for Videos
const videoSchema = new Schema<Video>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        unique: true,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    controls: {
        type: Boolean,
        default: true
    },
    transformations: {
        height: {
            type: Number,
            default: VIDEO_DIMENSIONS.height,
            required: true,
        },
        width: {
            type: Number,
            default: VIDEO_DIMENSIONS.width,
            required: true,
        }
    }
}, { timestamps: true });

// Checking if the model pre-exists, if not, create a new one
const VideoModel = models?.Videos || model<Video>("Videos", videoSchema);

export default VideoModel;