require("dotenv").config();

const {
    sendAppointmentWhatsApp,
    sendAppointmentCancelledWhatsApp,
    sendAppointmentCompletedWhatsApp,
    sendPatientAdmittedWhatsApp,
    sendPatientDischargedWhatsApp
} = require("./services/whatsappService");

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

const { nanoid } = require("nanoid");

app.use(cors());

app.use(express.json());

const SECRET = process.env.JWT_SECRET;

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
                    doctorId: user.doctorId,
                    patientUserId: user.patientUserId
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
                    patientUserId: user.patientUserId,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    doctorId: user.doctorId,
                    age: user.age,
                    gender: user.gender,
                    phoneNo: user.phoneNo,
                    bloodGroup: user.bloodGroup,
                    photo: user.photo
                }
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.post(
    "/register",
    async (req, res) => {
        try {
            const existingUser = await User.findOne({
                email: req.body.email
            });
            if (existingUser) {
                return res.status(400).json({
                    message: "Email already registered"
                });
            }
            const hashedPassword = await bcrypt.hash(
                req.body.password,
                10
            );
            const patientUserId = `USR-${nanoid(8)}`;
            const user = await User.create({
                patientUserId,
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: "patient",
                age: req.body.age,
                gender: req.body.gender,
                phoneNo: req.body.phoneNo,
                bloodGroup: req.body.bloodGroup
            });
            res.status(201).json({
                message: "Registration Successful",
                user
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.get(
    "/users",
    async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

app.get(
    "/users/:patientUserId",
    async (req, res) => {
        try {

            const user = await User.findOne({
                patientUserId: req.params.patientUserId
            });

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.json(user);

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

            const patient = await Patient.findOneAndUpdate(
                { id: req.params.id },
                req.body,
                { new: true }
            );

            if (!patient) {
                return res.status(404).json({
                    message: "Patient not found"
                });
            }

            if (patient.status === "Discharged") {
                await sendPatientDischargedWhatsApp(patient);
            }

            res.json(patient);

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

            const appointment =
                await Appointment.create({
                    id: req.body.id,
                    patientUserId: req.body.patientUserId,
                    patient: req.body.patient,
                    patientEmail: req.body.patientEmail,
                    age: req.body.age,
                    gender: req.body.gender,
                    phoneNo: req.body.phoneNo,
                    bloodGroup: req.body.bloodGroup,
                    photo: req.body.photo || "",
                    doctor: req.body.doctor,
                    doctorId: req.body.doctorId,
                    date: req.body.date,
                    time: req.body.time,
                    status: "Scheduled"
                });

            await sendAppointmentWhatsApp({
                id: appointment.id,
                patient: appointment.patient,
                doctor: appointment.doctor,
                date: appointment.date,
                time: appointment.time,
                phoneNo: appointment.phoneNo
            });

            res.status(201).json(
                appointment
            );

        } catch (error) {

            console.log(error);

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

            const appointment =
                await Appointment.findOneAndUpdate(
                    { id: req.params.id },
                    req.body,
                    { new: true }
                );

            if (!appointment) {
                return res.status(404).json({
                    message: "Appointment not found"
                });
            }

            if (appointment.status === "Cancelled") {

                await sendAppointmentCancelledWhatsApp({
                    id: appointment.id,
                    patient: appointment.patient,
                    doctor: appointment.doctor,
                    date: appointment.date,
                    time: appointment.time,
                    phoneNo: appointment.phoneNo
                });

            }

            if (appointment.status === "Completed") {

                const admittedPatient = await Patient.findOne({
                    appointmentId: appointment.id
                });

                if (admittedPatient) {

                    await sendPatientAdmittedWhatsApp(admittedPatient);

                } else {

                    await sendAppointmentCompletedWhatsApp({
                        id: appointment.id,
                        patient: appointment.patient,
                        doctor: appointment.doctor,
                        phoneNo: appointment.phoneNo
                    });

                }

            }

            res.json(appointment);

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