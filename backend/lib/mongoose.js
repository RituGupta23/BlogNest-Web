import mongoose from "mongoose"

export default function mongooseconnect() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    } else {
        const uri = process.env.MONGODB_URI
        return mongoose.connect(uri);
    }
}