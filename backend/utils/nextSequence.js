import Counter from "../models/counterSchema.js";

export const getNextSequence = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "url" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
};