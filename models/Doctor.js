const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
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
        specialization: String,
        experience: String,
        department: String,
        qualifiation: String,
        phoneNo: String,
        photo: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Doctor", doctorSchema);