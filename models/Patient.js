const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        appointmentId: {
            type: String,
            required: true
        },
        patientUserId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: String,
        age: String,
        gender: String,
        phoneNo: String,
        bloodGroup: String,
        photo: String,
        doctorName: {
            type: String,
            required: true
        },
        doctorId: {
            type: String,
            required: true
        },
        disease: {
            type: String,
            default: ""
        },
        roomNo: {
            type: String,
            default: ""
        },
        admissionDate: {
            type: String,
            default: ""
        },
        dischargeDate: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            enum: [
                "Admitted",
                "Discharged"
            ],
            default: "Admitted"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Patient", patientSchema);