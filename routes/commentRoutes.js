const Route = require("express");
const commentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");
const authMIddleWare = require("../auth-middleware"); 
const commentRoute = Route();

commentRoute.post("/comment", authMIddleWare, async (req, res) => {
const { postid, userid, comment } = req.body;
try {
    const com = await commentModel.create({
       postid,
       userid, 
       comment,
    });
  await postModel.findByIdAndUpdate(postid, {
    $push: {
        comments: com._id,
    },
  });
    res.status(200).json(com)
} catch (error) {
    console.log(error);
    res.status(200).json(error)
}
});

commentRoute.get("/post/:postId", async (req, res) => {
  const { postId } = req.params;
  const response = await commentModel.find({postid : postId}).populate({
    path: "userid",
    select: "username profileImage",
  });
  res.send(response);
});


module.exports = commentRoute;