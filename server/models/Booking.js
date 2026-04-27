import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    bookingType: { type: String, enum: ["Hotel", "Transport"], required: true },
    bookingName: { type: String, required: true, trim: true },
    provider: { type: String, default: "" },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    details: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
