const Route = require("express");
const userModel = require("../models/userSchema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRoute = Route();

// userRoute.post("/login", async (req, res) => {
//   const { username, email, userId } = req.body;                
  
// })

userRoute.post("/signup", async (req, res) => {
    const { username, password, email} = req.body;
    const saltRound = 10;
try {
      const hashedPassword = await bcrypt.hash(password, saltRound); 
      const createdUser = await userModel.create({
          username, 
          password: hashedPassword,
          email
      });
     const token = jwt.sign(
       {
         userId: createdUser._id,
         username: createdUser.username,
       },
       process.env.JWT_SECRET,
       { expiresIn: "24h" }
     );
     res.send({ user: createdUser, token })
} catch (error) {
  console.error(error)
  res.json({ message: `failed to create user`});
}
});

userRoute.get("/user/posts", async (req, res) => {
  try {
     const post = await userModel.find().populate("posts", "caption postimage");
     res.status(200).json(post);
  } catch (error) {}
});

userRoute.post("/user/follow", async (req, res) => {
    const { followingUserId, followedUserId } = req.body;
      try {
        await userModel.findByIdAndUpdate(followingUserId, {
          $AddToSet: {
            following: followedUserId,
          },
        });
        await userModel.findByIdAndUpdate(followingUserId, {
          $AddToSet: {
            followers: followingUserId,
          },
        });
        res.status(200).json("done");
      } catch (error) {
        throw new Error(error);
      }
});

module.exports = userRoute;