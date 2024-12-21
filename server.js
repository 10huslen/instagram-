const express = require("express");
const cors = require("cors")
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const dotenv = require("dotenv");
const commentRoute = require("./routes/commentRoutes");
app.use(express.json());
app.use(cors())
dotenv.config();
const PORT = 8080;

const connectToDb = async () => {
 try {
   await mongoose.connect(process.env.MONGODB_URI);
   console.log("conn db")
 } catch (error) {
    console.log(error)
 }
};

app.use("",userRoute);
app.use("", postRoute);
app.use("", commentRoute);
connectToDb();

app.listen(PORT, console.log(`running on ${PORT}`));
    
