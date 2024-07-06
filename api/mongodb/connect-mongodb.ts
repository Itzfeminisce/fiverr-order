import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL as string, {
    dbName: "fiverr",
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

