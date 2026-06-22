require("dotenv").config();

const connectDB = require("./config/db");

const Patient = require("./models/Patient");

const Doctor = require("./models/Doctor");

const Appointment = require("./models/Appointment");

const express = require("express");

const cors = require("cors");

const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use(express.json());

const SECRET = "hospital-secret";

app.post("/login", (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (
        email === "admin@hospital.com" &&
        password === "admin123"
    ) {
        const token = jwt.sign(
            { email },
            SECRET,
            { expiresIn: "7d" } 
        );
        return res.json({
            token
        });
    }

    return res.status(401).json({
        message: "Invalid Credentials"
    });
});

app.get(
    "/patients",
    async (req, res) => {
        try {
            const patients = await Patient.find();
            res.json(patient);
        } catch (error) {
            res.status(500).json({
                essage: error.message
            });
        }
    }
);

app.post(
    "/patients",
    async (req, res) => {
        try {
            const patient = await Patient.create(req.body);
            res.status(201).json(patient);
        } catch (error) {
            res.status(500).json({
                essage: error.message
            });
        }
    }
);

app.get(
    "/doctors",
    (req, res) => {
        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));
        res.json(db.doctors);
    }
);

app.post(
    "/doctors",
    (req, res) => {
        
        const doctor = req.body;

        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));

        db.doctors.push(doctor);

        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        res
            .status(201)
            .json(doctor);
    }
);

app.get(
    "/appointments",
    (req, res) => {
        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));
        res.json(db.appointments);
    }
);

app.post(
    "/appointments",
    (req, res) => {
        
        const appointment = req.body;

        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));

        db.appointments.push(appointment);

        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        res
            .status(201)
            .json(appointment);
    }
);

app.delete(
    "/patients/:id",
    (req, res) => {
        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));
        db.patients = db.patients.filter(
            patient => patient.id !== req.params.id
        );
        fs.writeFileSync(
            dbPath,
            JSON.stringify(
                db,
                null,
                2
            )
        );
        res.json({
            message: "Patient Deleted"
        });
    }
);

app.delete(
    "/doctors/:id",
    (req, res) => {
        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));
        db.doctors = db.doctors.filter(
            doctor => doctor.id !== req.params.id
        );
        fs.writeFileSync(
            dbPath,
            JSON.stringify(
                db,
                null,
                2
            )
        );
        res.json({
            message: "Doctor Deleted"
        });
    }
);

app.delete(
    "/appointments/:id",
    (req, res) => {
        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));
        db.appointments = db.appointments.filter(
            appointment => appointment.id !== req.params.id
        );
        fs.writeFileSync(
            dbPath,
            JSON.stringify(
                db,
                null,
                2
            )
        );
        res.json({
            message: "Appointment Deleted"
        });
    }
);

app.put(
    "/patients/:id",
    (req, res) => {
        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));
        const index = db.patients.findIndex(
            patient => patient.id === req.params.id
        );
        if (
            index === -1
        ) {
            return res
                .status(404)
                .json({
                    message: "Patient not found"
                });
        }
        db.patients[index] =
        {
            ...db.patients[index],
            ...req.body
        };
        fs.writeFileSync(
            dbPath,
            JSON.stringify(
                db,
                null,
                2
            )
        );
        res.json(db.patients[index]);
    }
);

app.put(
    "/doctors/:id",
    (req, res) => {
        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));
        const index = db.doctors.findIndex(
            doctor => doctor.id === req.params.id
        );
        if (
            index === -1
        ) {
            return res
                .status(404)
                .json({
                    message: "Doctor not found"
                });
        }
        db.doctors[index] =
        {
            ...db.doctors[index],
            ...req.body
        };
        fs.writeFileSync(
            dbPath,
            JSON.stringify(
                db,
                null,
                2
            )
        );
        res.json(db.doctors[index]);
    }
);

app.put(
    "/appointments/:id",
    (req, res) => {
        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));
        const index = db.appointments.findIndex(
            appointment => appointment.id === req.params.id
        );
        if (
            index === -1
        ) {
            return res
                .status(404)
                .json({
                    message: "Appointment not found"
                });
        }
        db.appointments[index] =
        {
            ...db.appointments[index],
            ...req.body
        };
        fs.writeFileSync(
            dbPath,
            JSON.stringify(
                db,
                null,
                2
            )
        );
        res.json(db.appointments[index]);
    }
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});