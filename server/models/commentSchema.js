const { Schema, mongoose } = require("mongoose");

const commentSchema = new Schema({
postid: { type: mongoose.Types.ObjectId, ref: "post" },
userid: { type: mongoose.Types.ObjectId, ref: "user" },
comment: { type: String, required: true },
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;