const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        patientUserId:{
            type: String,
            required: true
        },
        patient: {
            type: String,
            required: true
        },
        patientEmail: {
            type: String,
            required: true
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
        },
        doctor: {
            type: String,
            required: true
        },
        doctorId: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: [
                "Scheduled",
                "Completed",
                "Cancelled"
            ],
            default: "Scheduled"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Appointment", appointmentSchema);