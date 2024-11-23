const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const dotenv = require("dotenv");
const commentRoute = require("./routes/commentRoutes");
app.use(express.json());

const PORT = 8080;

const connectToDb = () => {
 try {
    mongoose.connect(
     dotenv.config()
   );
 } catch (error) {
    res.send(error);
 }
};

app.use("",userRoute);
app.use("", postRoute);
app.use("", commentRoute);
connectToDb();

app.listen(PORT, console.log(`running on ${PORT}`));
    
