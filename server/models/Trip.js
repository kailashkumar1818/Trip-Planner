import mongoose from "mongoose";

const itineraryItemSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    title: { type: String, required: true, trim: true },
    note: { type: String, trim: true, default: "" }
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tripName: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
    notes: { type: String, default: "" },
    itinerary: [itineraryItemSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
