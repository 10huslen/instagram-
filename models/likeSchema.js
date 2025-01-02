const { Schema, mongoose } = require("mongoose");

const likeSchema = new Schema({
  userid: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  likes: { type: mongoose.Types.ObjectId, ref: "likes"},
});

const LikeModel = mongoose.model("like", likeSchema);

module.exports = LikeModel;