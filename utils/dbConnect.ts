import mongoose from 'mongoose';

async function dbConnect() {
    if (mongoose.connection.readyState === 1) {
        return
    }
    try {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI)
        }

    } catch (error) {
        console.error(error)
    }
}

export default dbConnect