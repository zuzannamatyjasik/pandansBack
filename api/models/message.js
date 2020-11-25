const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
