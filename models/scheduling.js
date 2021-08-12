const mongoose = require("mongoose")

const schedulingSchema = new mongoose.Schema({
  created_date: {
    type: Date,
    default: Date.now,
  },
  selectedDate: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Booked", "Pending","rejected"],
  },
  aluminiStatus: {
    type: String,
    default: "Pending",
    enum: ["Approved", "rejected", "Pending"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fuser",
  },
});

module.exports = mongoose.model("scheduling", schedulingSchema)