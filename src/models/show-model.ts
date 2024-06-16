import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String, // movie or web series
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    theariticalReleaseDate: {
      type: String,
      required: true,
    },
    ottReleaseDate: {
      type: String,
      required: true,
    },
    durationInMinutes: {
      type: Number,
      required: true,
    },
    castAndCrew: {
      type: Array,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
      required: true,
    },
    trailer: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    episodes: {
      type: Array,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["shows"]) {
  delete mongoose.models["shows"];
}

const ShowModel = mongoose.model("shows", showSchema);
export default ShowModel;
