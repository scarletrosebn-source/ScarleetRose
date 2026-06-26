const mongoose = require("mongoose");
const paymentRecordSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        required: true
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("PaymentRecord", paymentRecordSchema);
