const Route = require("express");
const commentModel = require("../models/commentSchema");
const PostModel = require("../models/postSchema");
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

commentRoute.get("/comment/", authMIddleWare, async (req, res) => {
  const comments = async (req, res) => {
    const { postId } = req.params;
    try {
      const comment = await postModel.findById(postId).populate({
        path: "comment",
        populate: {
          path: "userId",
          select: "username profileImg",
        },
      });
      res.send(comment);
    } catch (error) {
      res.send("err");
      console.log(error);
    }
  };
})

module.exports = commentRoute;