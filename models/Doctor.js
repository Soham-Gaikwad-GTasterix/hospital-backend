const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
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
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        specialization: String,
        experience: String,
        department: String,
        qualification: String,
        phoneNo: String,
        photo: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Doctor", doctorSchema);