const Route = require("express");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");
const authMiddleware = require("../auth-middleware")


const postRoute = Route();

postRoute.post("/post/create", async (req, res) => {
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

postRoute.get("/posts", authMiddleware, async (req, res) => {
try {
  const posts = await postModel 
  .find()
  .populate("userid", "username profileimage");
  res.json(posts);
} catch (error) {
  res.status(404).json({message: `failed to get posts, ${error}` })
}
});

postRoute.get("/post/:postId", async (req, res) => {
  const {postId} = req.query;
  const response = await postModel.find(postId).populate({
    path: "comments",
    populate: {
      path: "userId",
      select: "username profileImage"
    }
  });
  res.send(response);
})

module.exports = postRoute;
