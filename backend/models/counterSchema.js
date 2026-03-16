import { Schema } from "mongoose";
import mongoose from "mongoose";

const counterSchema = new Schema ( {
  name: {type: String, required: true},
  seq: { type: Number, default: 0}
});

export default mongoose.model("Counter", counterSchema);
