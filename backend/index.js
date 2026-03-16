import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import urlRoutes from "./routes/url.routes.js";
import 'dotenv/config';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use("/", urlRoutes);

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected successfully');
    }catch(err){
        console.log("Could Not Connect to Database!", err);
    }
}

app.listen(port, () => {
    console.log(`app is listening ${port}`);
    connectDb();
});

