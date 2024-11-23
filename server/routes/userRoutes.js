const Route = require("express");
const userModel = require("../models/userSchema");

const userRoute = Route();

userRoute.post("/signup", async (req, res) => {
    const { username, password, email, profileimg } = req.body;
    try {
    const createdUser = await userModel.create({
        username, 
        password,
        email,
        profileimg,
    });
    res.status(200).json(createdUser);
} catch (error) {
    console.log(error);
    throw new Error(error);
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