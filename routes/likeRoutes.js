const Route = require("express");
const postModel = require("../models/postSchema");
const likeModel = require("../models/likeSchema");

const likeRoute = Route();

likeRoute.post("/post/dislike", async (req, res) => {
    const { postId, userId } = req.body;
        const dislikedPostResponse = await postModel.findByIdAndUpdate(postId, {
            $pull: {
                likes: userId,
            },
        });
        res.status(200).json(dislikedPostResponse);
})

likeRoute.post("/post/like", async (req, res) => {
  const { postId, userId } = req.body;
  console.log(postId, userId);
    const likedPostResponse = await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: userId,
      },
    });
    res.status(200).json(likedPostResponse);
});

module.exports = likeRoute;
