const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        patient: {
            type: String,
            required: true
        },
        doctor: {
            type: String,
            required: true
        },
        date: String,
        time: String,
        status: {
            type: String,
            default: "Scheduled"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Appointment", appointmentSchema);