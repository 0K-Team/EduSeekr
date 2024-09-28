import { Schema, model } from "mongoose";

const schema = new mongoose.Schema({
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
    majors: {
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
    internat: Boolean,
    address: {
        city: String,
        street: String,
        building: String,
        apartament: String,
        postal: String
    }
});

schema.index({ location: "2dsphere" });

export default model("rspo", schema);