require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const Patient = require("./models/Patient");

const Doctor = require("./models/Doctor");

const Appointment = require("./models/Appointment");

const User = require("./models/User");

const express = require("express");

const cors = require("cors");

const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

const SECRET = procss.env.JWT_SECRET;

app.post(
    "/login",
    async (req, res) => {
        try {
            const {
                email,
                password,
            } = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(401).json({
                    message: "Invalid Credentials"
                });
            }
            const isMatch = await bcrypt.compare(
                password,
                user.password
            );
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid Credentials"
                });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    doctorId: user.doctorId
                },
                SECRET,
                {
                    expiresIn: "7d"
                }
            );
            res.json({
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    doctorId: user.doctorId
                }
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.get(
    "/patients",
    async (req, res) => {
        try {
            const patients = await Patient.find();
            res.json(patients);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.post(
    "/patients",
    async (req, res) => {
        try {
            const patients = await Patient.create(req.body);
            res.status(201).json(patients);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.put(
    "/patients/:id",
    async (req, res) => {
        try {
            const patients = await Patient.findOneAndUpdate(
                { id: req.params.id },
                req.body,
                { new: true },
            );
            if (!patients) {
                return res.status(404).json({
                    message: "Patient not found"
                });
            }
            res.json(patients);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.delete(
    "/patients/:id",
    async (req, res) => {
        try {
            const patients = await Patient.findOneAndDelete(
                { id: req.params.id }
            );
            if (!patients) {
                return res.status(404).json({
                    message: "Patient not found"
                });
            }
            res.json({
                message: "Patient Deleted"
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.get(
    "/doctors",
    async (req, res) => {
        try {
            const doctors = await Doctor.find();
            res.json(doctors);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.post(
    "/doctors",
    async (req, res) => {
        try {
            const doctors = await Doctor.create(req.body);

            const hashedPassword = await bcrypt.hash(
                req.body.password,
                10
            );

            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: "doctor",
                doctorId: req.body.id
            });

            res.status(201).json(doctors);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.put(
    "/doctors/:id",
    async (req, res) => {
        try {
            const doctors = await Doctor.findOneAndUpdate(
                { id: req.params.id },
                req.body,
                { new: true },
            );
            if (!doctors) {
                return res.status(404).json({
                    message: "Doctor not found"
                });
            }

            const updateData = {
                name: req.body.name,
                email: req.body.email
            };

            if (req.body.password) {
                updateData.password = await bcrypt.hash(
                    req.body.password,
                    10
                );
            }

            await User.findOneAndUpdate(
                {
                    doctorId: req.params.id
                },
                updateData
            );

            res.json(doctors);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.delete(
    "/doctors/:id",
    async (req, res) => {
        try {
            const doctors = await Doctor.findOneAndDelete(
                { id: req.params.id }
            );
            if (!doctors) {
                return res.status(404).json({
                    message: "Doctor not found"
                });
            }
            await User.findOneAndDelete({
                doctorId: req.params.id
            });
            res.json({
                message: "Doctor Deleted"
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.get(
    "/appointments",
    async (req, res) => {
        try {
            const appointments = await Appointment.find();
            res.json(appointments);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.post(
    "/appointments",
    async (req, res) => {
        try {
            const appointments = await Appointment.create(req.body);
            res.status(201).json(appointments);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.put(
    "/appointments/:id",
    async (req, res) => {
        try {
            const appointments = await Appointment.findOneAndUpdate(
                { id: req.params.id },
                req.body,
                { new: true },
            );
            if (!appointments) {
                return res.status(404).json({
                    message: "Appointments not found"
                });
            }
            res.json(appointments);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.delete(
    "/appointments/:id",
    async (req, res) => {
        try {
            const appointments = await Appointment.findOneAndDelete(
                { id: req.params.id }
            );
            if (!appointments) {
                return res.status(404).json({
                    message: "Appointment not found"
                });
            }
            res.json({
                message: "Appointment Deleted"
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
};

startServer();