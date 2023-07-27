import mongoose from "mongoose";

const TattooSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    part: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tattoo", TattooSchema);
