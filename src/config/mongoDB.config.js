import mongoose from "mongoose"

export const connectMongoDB = async () => {
    try {
        mongoose.connect("mongodb+srv://dbadmin:SpAF7RvC9Aftenry@backendproject.jipfent.mongodb.net/mongohouse")
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}
