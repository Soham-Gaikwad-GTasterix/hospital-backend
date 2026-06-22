const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            require: true,
            unique: true
        },
        patient: {
            type: String,
            require: true
        },
        doctor: {
            type: String,
            require: true
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