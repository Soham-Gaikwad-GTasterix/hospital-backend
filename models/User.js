const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            emum: ["admin", "doctor", "patient"],
            default: "patient"
        },
        doctorId: {
            type: String,
            default: null
        },
        age: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            default: ""
        },
        phoneNo: {
            type: String,
            default: ""
        },
        bloodGroup: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);