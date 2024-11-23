const { Schema, mongoose } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profileimg: { type: String },
  bio: { type: String },
  posts: [{ type: mongoose.Types.ObjectId, ref: "post" }],
  following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;