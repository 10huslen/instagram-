const Route = require("express");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

const postRoute = Route();

postRoute.post("/post", async (req, res) => {
  const { caption, postimage, userid } = req.body;
  try {
    const createdPost = await postModel.create({
      caption,
      postimage,
      userid,
    });
    await userModel.findByIdAndUpdate(userid, {
      $push: {
        posts: createdPost._id,
      },
    });
    res.status(200).json(createdPost);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

module.exports = postRoute;
