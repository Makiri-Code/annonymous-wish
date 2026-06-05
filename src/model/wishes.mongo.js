const mongoose = require("mongoose");

const wishesSchema = new mongoose.Schema(
  {
    wish: {
      type: String,
      trim: true,
      required: [true, "Please send me a wish"],
      min: 20,
      max: 150,
    },
    response: {
      type: String,
      trim: true,
      required: [true, "AI response is required"],
      select: false,
    },
    reactions: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true },
);
wishesSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();

  if (update.reactions) {
    update.reactionsCount = update.reactions.length;
  }
});
module.exports = mongoose.model("Wish", wishesSchema);
