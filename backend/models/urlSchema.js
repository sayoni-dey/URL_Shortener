import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema ( {
    originalUrl: {type : String, required : true},
    shortCode: {type : String, required: true, unique: true, index:true},
    clicks : {type: Number, default: 0},
    expiresAt : {type: Date, default: null}
},
 { timestamps: true }
);

export const Url = mongoose.model('Url', urlSchema);