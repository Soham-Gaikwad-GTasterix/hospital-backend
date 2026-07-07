const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        patientUserId: {
            type: String,
            default: null
        },
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
            enum: [
                "admin", 
                "doctor", 
                "patient"
            ],
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
        },
        photo: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);