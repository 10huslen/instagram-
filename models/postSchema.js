const { Schema, mongoose } = require("mongoose");

const postSchema = new Schema(
  {
    caption: { type: String, required: true },
    profileimage: { type: String, required: true },
    postimage: { type: String, required: true},
    userid: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment", default:[] }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "user", required: true, default: [] }],
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;