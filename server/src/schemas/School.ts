import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    city: String,
    street: String,
    building: String,
    apartament: String,
    postal: String
}, { _id: false });

const locationSchema = new Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, { _id: false });

const schoolSchema = new Schema({
    rspo: {
        type: Number,
        unique: true,
        required: true,
        index: true
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
        type: locationSchema,
        required: true
    },
    website: String,
    phone: String,
    email: String,
    principalName: String,
    principalSurname: String,
    internat: Boolean,
    address: addressSchema,
    city: String,
    polish: {
        written: Number,
        oral: Number
    },
    english: {
        written: Number,
        oral: Number
    },
    math: Number
});

schoolSchema.index({ "location": "2dsphere" });

export default model("rspo", schoolSchema);