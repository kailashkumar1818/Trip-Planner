import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    destinationName: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    recommendedPlaces: [{ type: String, trim: true }],
    coverImage: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);
