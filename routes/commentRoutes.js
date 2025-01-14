const Route = require("express");
const commentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");
const authMIddleWare = require("../auth-middleware"); 
const commentRoute = Route();

commentRoute.post("/comment/", authMIddleWare, async (req, res) => {
const { postid, userid, comment } = req.body;
try {
    const com = await commentModel.create({
       postid,
       userid, 
       comment,
    });
  await commentModel.findByIdAndUpdate(postid, {
    $push: {
        comment: com._id,
    },
  });
    res.status(200).json(com)
} catch (error) {
    console.log(error);
    res.status(200).json(error)
}
});

commentRoute.get("/post/:postId", async (req, res) => {
  const { postId } = req.query;
  const response = await postModel.find(postId).populate({
    path: "comments",
    populate: {
      path: "userId",
      select: "username profileImage",
    },
  });
  res.send(response);
});


module.exports = commentRoute;