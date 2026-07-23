const { BrevoClient } = require("@getbrevo/brevo");

const client = new brevo.BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

console.log("✅ Brevo Email Service Ready");

async function sendAppointmentEmail(appointment) {

    try {

        await client.smtpTemplates.sendTransacEmail({

            sender: {
                name: "Hospital Management System",

                email: process.env.EMAIL_USER
            },

            to: [
                {
                    email: appointment.patientEmail,

                    name: appointment.patient
                }
            ],

            subject: "Hospital Appointment Confirmation",

            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:10px; overflow:hidden;">
                    <div style="background:#2563eb; color:white; padding:20px; text-align:center;">
                        <h2>🏥 Hospital Appointment Confirmation</h2>
                    </div>

                    <div style="padding:25px;">

                        <p>Hello <b>${appointment.patient}</b>,</p>

                        <p>Your appointment has been booked successfully.</p>

                        <table style="width:100%; border-collapse:collapse; margin-top:20px;">
                            <tr>
                                <td style="padding:8px;"><b>Appointment ID</b></td>
                                <td style="padding:8px;">${appointment.id}</td>
                            </tr>

                            <tr>
                                <td style="padding:8px;"><b>Doctor</b></td>
                                <td style="padding:8px;">${appointment.doctor}</td>
                            </tr>

                            <tr>
                                <td style="padding:8px;"><b>Date</b></td>
                                <td style="padding:8px;">${appointment.date}</td>
                            </tr>

                            <tr>
                                <td style="padding:8px;"><b>Time</b></td>
                                <td style="padding:8px;">${appointment.time}</td>
                            </tr>
                        </table>

                        <p style="margin-top:25px;">
                            Please arrive at least <b>15 minutes</b> before your appointment.
                        </p>

                        <p>Thank you for choosing our hospital.</p>

                        <p>
                            Stay Healthy ❤️
                        </p>

                    </div>

                    <div style="background:#f5f5f5; padding:15px; text-align:center; font-size:13px; color:#666;">
                        Hospital Management System
                    </div>
                </div>
            `

        });

        console.log("==================================");
        console.log("✅ Appointment Email Sent");
        console.log("==================================");

        return {
            success: true
        };

    } catch (error) {

        console.log("==================================");
        console.log("❌ Appointment Email Failed");
        console.log(error);
        console.log("==================================");

        return {
            success: false
        };

    }

}

async function sendAppointmentCancelledEmail(appointment) {

    try {

        await client.smtpTemplates.sendTransacEmail({

            sender: {
                name: "Hospital Management System",

                email: process.env.EMAIL_USER
            },

            to: [
                {
                    email: appointment.patientEmail,

                    name: appointment.patient
                }
            ],

            subject: "Hospital Appointment Cancelled",

            htmlContent: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #ddd;border-radius:10px;overflow:hidden;">

                    <div style="background:#dc2626;color:white;padding:20px;text-align:center;">
                        <h2>❌ Appointment Cancelled</h2>
                    </div>

                    <div style="padding:25px;">

                        <p>Hello <b>${appointment.patient}</b>,</p>

                        <p>Your appointment has been cancelled successfully.</p>

                        <table style="width:100%;margin-top:20px;">

                            <tr>
                                <td><b>Appointment ID</b></td>
                                <td>${appointment.id}</td>
                            </tr>

                            <tr>
                                <td><b>Doctor</b></td>
                                <td>${appointment.doctor}</td>
                            </tr>

                            <tr>
                                <td><b>Date</b></td>
                                <td>${appointment.date}</td>
                            </tr>

                            <tr>
                                <td><b>Time</b></td>
                                <td>${appointment.time}</td>
                            </tr>

                        </table>

                        <p style="margin-top:20px;">
                            If this cancellation was accidental, you can book another appointment through the app.
                        </p>

                    </div>

                </div>
            `

        });

        console.log("==================================");
        console.log("✅ Appointment Cancelled Email Sent");
        console.log("==================================");

        return { success: true };

    } catch (error) {

        console.log("==================================");
        console.log("❌ Appointment Cancelled Email Failed");
        console.log(error);
        console.log("==================================");

        return { success: false };

    }

}

async function sendAppointmentCompletedEmail(appointment) {

    try {

        await client.smtpTemplates.sendTransacEmail({

            sender: {
                name: "Hospital Management System",

                email: process.env.EMAIL_USER
            },

            to: [
                {
                    email: appointment.patientEmail,

                    name: appointment.patient
                }
            ],

            subject: "Consultation Completed",

            htmlContent: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #ddd;border-radius:10px;overflow:hidden;">

                    <div style="background:#16a34a;color:white;padding:20px;text-align:center;">
                        <h2>✅ Consultation Completed</h2>
                    </div>

                    <div style="padding:25px;">

                        <p>Hello <b>${appointment.patient}</b>,</p>

                        <p>Your consultation has been completed successfully.</p>

                        <table style="width:100%;margin-top:20px;">

                            <tr>
                                <td><b>Appointment ID</b></td>
                                <td>${appointment.id}</td>
                            </tr>

                            <tr>
                                <td><b>Doctor</b></td>
                                <td>${appointment.doctor}</td>
                            </tr>

                        </table>

                        <p style="margin-top:20px;">
                            Thank you for visiting our hospital.
                        </p>

                        <p>
                            Stay Healthy ❤️
                        </p>

                    </div>

                </div>
            `

        });

        console.log("==================================");
        console.log("✅ Appointment Completed Email Sent");
        console.log("==================================");

        return { success: true };

    } catch (error) {

        console.log("==================================");
        console.log("❌ Appointment Completed Email Failed");
        console.log(error);
        console.log("==================================");

        return { success: false };

    }

}

async function sendPatientAdmittedEmail(patient) {

    try {

        await client.smtpTemplates.sendTransacEmail({

            sender: {
                name: "Hospital Management System",

                email: process.env.EMAIL_USER
            },

            to: [
                {
                    email: appointment.patientEmail,

                    name: appointment.patient
                }
            ],

            subject: "Patient Admission Confirmation",

            htmlContent: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #ddd;border-radius:10px;overflow:hidden;">

                    <div style="background:#2563eb;color:white;padding:20px;text-align:center;">
                        <h2>🏥 Patient Admission Confirmation</h2>
                    </div>

                    <div style="padding:25px;">

                        <p>Hello <b>${patient.name}</b>,</p>

                        <p>
                            You have been admitted successfully.
                        </p>

                        <table style="width:100%;margin-top:20px;">

                            <tr>
                                <td><b>Patient ID</b></td>
                                <td>${patient.id}</td>
                            </tr>

                            <tr>
                                <td><b>Doctor</b></td>
                                <td>${patient.doctorName}</td>
                            </tr>

                            <tr>
                                <td><b>Ward</b></td>
                                <td>${patient.roomType}</td>
                            </tr>

                            <tr>
                                <td><b>Room</b></td>
                                <td>${patient.roomNo}</td>
                            </tr>

                            ${
                                patient.bedNo
                                    ? `
                            <tr>
                                <td><b>Bed</b></td>
                                <td>${patient.bedNo}</td>
                            </tr>
                            `
                                    : ""
                            }

                        </table>

                        <p style="margin-top:20px;">
                            Our medical team will take good care of you throughout your stay.
                        </p>

                        <p>
                            We wish you a speedy recovery. ❤️
                        </p>

                    </div>

                </div>
            `

        });

        console.log("==================================");
        console.log("✅ Admission Email Sent");
        console.log("==================================");

        return {
            success: true
        };

    } catch (error) {

        console.log("==================================");
        console.log("❌ Admission Email Failed");
        console.log(error);
        console.log("==================================");

        return {
            success: false
        };

    }

}

async function sendPatientDischargedEmail(patient) {

    try {

        await client.smtpTemplates.sendTransacEmail({

            sender: {
                name: "Hospital Management System",

                email: process.env.EMAIL_USER
            },

            to: [
                {
                    email: appointment.patientEmail,

                    name: appointment.patient
                }
            ],

            subject: "Patient Discharge Confirmation",

            htmlContent: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #ddd;border-radius:10px;overflow:hidden;">

                    <div style="background:#16a34a;color:white;padding:20px;text-align:center;">
                        <h2>🏠 Patient Discharge Confirmation</h2>
                    </div>

                    <div style="padding:25px;">

                        <p>Hello <b>${patient.name}</b>,</p>

                        <p>
                            You have been discharged successfully.
                        </p>

                        <table style="width:100%;margin-top:20px;">

                            <tr>
                                <td><b>Patient ID</b></td>
                                <td>${patient.id}</td>
                            </tr>

                            <tr>
                                <td><b>Doctor</b></td>
                                <td>${patient.doctorName}</td>
                            </tr>

                            <tr>
                                <td><b>Ward</b></td>
                                <td>${patient.roomType}</td>
                            </tr>

                            <tr>
                                <td><b>Room</b></td>
                                <td>${patient.roomNo}</td>
                            </tr>

                            ${
                                patient.bedNo
                                    ? `
                            <tr>
                                <td><b>Bed</b></td>
                                <td>${patient.bedNo}</td>
                            </tr>
                            `
                                    : ""
                            }

                            <tr>
                                <td><b>Discharge Date</b></td>
                                <td>${patient.dischargeDate}</td>
                            </tr>

                        </table>

                        <p style="margin-top:20px;">
                            Please follow your doctor's advice and continue taking your prescribed medications.
                        </p>

                        <p>
                            Thank you for choosing our hospital.
                        </p>

                        <p>
                            Stay Healthy ❤️
                        </p>

                    </div>

                </div>
            `

        });

        console.log("==================================");
        console.log("✅ Discharge Email Sent");
        console.log("==================================");

        return {
            success: true
        };

    } catch (error) {

        console.log("==================================");
        console.log("❌ Discharge Email Failed");
        console.log(error);
        console.log("==================================");

        return {
            success: false
        };

    }

}

module.exports = {
    sendAppointmentEmail,
    sendAppointmentCancelledEmail,
    sendAppointmentCompletedEmail,
    sendPatientAdmittedEmail,
    sendPatientDischargedEmail
};