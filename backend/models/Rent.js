import mongoose from "mongoose";

const rentSchema = new mongoose.Schema(
  {
    currentOwner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
  },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    bed: {
      type: Number,
      required: true,
      min: 1,
    },
    bath: {
      type: Number,
      required: true,
      min: 1,
    },
    photo01: {
      type: String,
      required: true,
    },
    photo02: {
      type: String,
      required: true,
    },
    photo03: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    availableFor: {
      type: String,
      required: true,
    },

    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rent", rentSchema);
