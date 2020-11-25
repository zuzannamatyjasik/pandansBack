const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
  category: {
    type: [String],
    require: true,
  },
  facebook: {
    type: String
  },
  instagram: {
    type: String
  },
  website: {
    type: String
  },
  followers: Number,
});

module.exports = mongoose.model("Shop", shopSchema);
