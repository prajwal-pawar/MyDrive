const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("File", fileSchema);
