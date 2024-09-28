import { Schema, model } from "mongoose";

const schema = new Schema({
    rspo: {
        type: Number,
        unique: true,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    shortName: String,
    professions: {
        type: [String],
        default: []
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    website: String,
    phone: String,
    email: String,
    principalName: String,
    principalSurname: String,
    internat: Boolean
});

schema.index({ location: "2dsphere" });

export default model("rspo", schema);