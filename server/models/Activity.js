import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    activityName: { type: String, required: true, trim: true },
    activityDate: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
