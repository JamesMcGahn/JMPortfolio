import mongoose from 'mongoose';

async function dbConnect() {
    if (mongoose.connection.readyState === 1) {
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.error(error)
    }
}

export default dbConnect