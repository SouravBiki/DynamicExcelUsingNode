import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

//console.log(process.env);
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
//const url = "mongodb://localhost:27017/company";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
export const connectDB = async () => {
    try {
        await mongoose.connect(url, options);
        console.log("Connected to Mongo");
    }
    catch (err) {
        console.error(err);
    }
}