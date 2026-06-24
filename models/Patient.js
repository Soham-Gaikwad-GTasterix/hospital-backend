const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: String,
        age: String,
        gender: String,
        disease: String,
        date: String,
        phoneNo: String,
        bloodGroup: String,
        doctorName: {
            type: String,
            required: true
        },
        doctorId: {
            type: String,
            required: true
        },
        roomNo: String,
        photo: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Patient", patientSchema);