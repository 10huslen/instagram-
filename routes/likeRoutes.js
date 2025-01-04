const Route = require("express");
const postModel = require("../models/postSchema");
const likeModel = require("../models/likeSchema");

const likeRoute = Route();

likeRoute.post("/post/like", async (req, res) => {
  const { postId, userId } = req.body;
  console.log(postId, userId);
  try {
    const likedPostResponse = await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: userId,
      },
    });
    res.status(200).json(likedPostResponse);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = likeRoute;
