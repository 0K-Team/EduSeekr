import { Schema, model } from "mongoose";

const schema = new Schema({
    rspo: {
        type: String,
        required: true,
        unique: true
    },
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

export default model("cke", schema);