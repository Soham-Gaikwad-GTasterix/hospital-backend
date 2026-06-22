const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            require: true,
            unique: true
        },
        name: {
            type: String,
            require: true
        },
        email: String,
        age: String,
        gender: String,
        disease: String,
        date: String,
        phoneNo: String,
        bloodGroup: String,
        roomNo: String,
        photo: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Patient", patientSchema);