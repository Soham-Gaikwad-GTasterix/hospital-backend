const axios = require("axios");

async function sendAppointmentWhatsApp(appointment) {
    try {
        // Convert to international format (India)
        let phone = String(appointment.phoneNo).replace(/\D/g, "");

        if (!phone.startsWith("91")) {
            phone = `91${phone}`;
        }

        const response = await axios.post(
            `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: phone,
                type: "text",
                text: {
                    preview_url: false,
                    body:
`🏥 HOSPITAL APPOINTMENT CONFIRMATION

Hello ${appointment.patient},

Your appointment has been booked successfully.

━━━━━━━━━━━━━━━━━━

🆔 Appointment ID
${appointment.id}

👨‍⚕️ Doctor
${appointment.doctor}

📅 Date
${appointment.date}

🕒 Time
${appointment.time}

━━━━━━━━━━━━━━━━━━

Please arrive at least 15 minutes before your appointment.

Thank you for choosing our hospital.

Stay Healthy ❤️`
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("==================================");
        console.log("✅ WhatsApp Message Sent");
        console.log("To:", phone);
        console.log("Message ID:", response.data.messages?.[0]?.id);
        console.log("==================================");

        return {
            success: true,
            data: response.data
        };

    } catch (error) {

        console.log("==================================");
        console.log("❌ WhatsApp Send Failed");
        console.log("Phone:", appointment.phoneNo);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Response:", error.response.data);
        } else {
            console.log(error.message);
        }

        console.log("==================================");

        // Don't throw the error.
        // Appointment should still be created.
        return {
            success: false,
            error: error.response?.data || error.message
        };
    }
}

async function sendAppointmentCancelledWhatsApp(appointment) {

    try {

        let phone = String(appointment.phoneNo).replace(/\D/g, "");

        if (!phone.startsWith("91")) {
            phone = `91${phone}`;
        }

        const response = await axios.post(
            `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: phone,
                type: "text",
                text: {
                    preview_url: false,
                    body:
`❌ APPOINTMENT CANCELLED

Hello ${appointment.patient},

Your appointment has been cancelled successfully.

━━━━━━━━━━━━━━━━━━

🆔 Appointment ID
${appointment.id}

👨‍⚕️ Doctor
${appointment.doctor}

📅 Date
${appointment.date}

🕒 Time
${appointment.time}

━━━━━━━━━━━━━━━━━━

If this cancellation was accidental, you can book another appointment through the app.

Thank you.
`
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("==================================");
        console.log("✅ Cancellation WhatsApp Sent");
        console.log("To:", phone);
        console.log("Message ID:", response.data.messages?.[0]?.id);
        console.log("==================================");

        return {
            success: true,
            data: response.data
        };

    } catch (error) {

        console.log("==================================");
        console.log("❌ Cancellation WhatsApp Failed");

        console.log(
            error.response?.data ||
            error.message
        );

        console.log("==================================");

        return {
            success: false
        };

    }

}

async function sendAppointmentCompletedWhatsApp(appointment) {

    try {

        let phone = String(appointment.phoneNo).replace(/\D/g, "");

        if (!phone.startsWith("91")) {
            phone = `91${phone}`;
        }

        const response = await axios.post(
            `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: phone,
                type: "text",
                text: {
                    preview_url: false,
                    body:
`✅ APPOINTMENT COMPLETED

Hello ${appointment.patient},

Your consultation has been completed successfully.

━━━━━━━━━━━━━━━━━━

🆔 Appointment ID
${appointment.id}

👨‍⚕️ Doctor
${appointment.doctor}

━━━━━━━━━━━━━━━━━━

If you continue to experience discomfort or need further medical advice, you can book another appointment through the app.

Thank you for choosing our hospital.

Stay Healthy ❤️`
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("==================================");
        console.log("✅ Appointment Completed WhatsApp Sent");
        console.log("==================================");

        return {
            success: true,
            data: response.data
        };

    } catch (error) {

        console.log("==================================");
        console.log("❌ Appointment Completed WhatsApp Failed");
        console.log(error.response?.data || error.message);
        console.log("==================================");

        return { success: false };
    }

}

async function sendPatientAdmittedWhatsApp(patient) {

    try {

        let phone = String(patient.phoneNo).replace(/\D/g, "");

        if (!phone.startsWith("91")) {
            phone = `91${phone}`;
        }

        const response = await axios.post(
            `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: phone,
                type: "text",
                text: {
                    preview_url: false,
                    body:
`🏥 PATIENT ADMITTED

Hello ${patient.name},

Your consultation has been completed and you have been admitted successfully.

━━━━━━━━━━━━━━━━━━

🆔 Patient ID
${patient.id}

👨‍⚕️ Doctor
${patient.doctorName}

🏥 Ward
${patient.roomType}

🚪 Room
${patient.roomNo}

${patient.bedNo ? `🛏 Bed\n${patient.bedNo}\n\n` : ""}━━━━━━━━━━━━━━━━━━

Our medical team will take care of you.

We wish you a speedy recovery. ❤️`
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("==================================");
        console.log("✅ Admission WhatsApp Sent");
        console.log("==================================");

        return {
            success: true,
            data: response.data
        };

    } catch (error) {

        console.log("==================================");
        console.log("❌ Admission WhatsApp Failed");
        console.log(error.response?.data || error.message);
        console.log("==================================");

        return { success: false };
    }

}

module.exports = {
    sendAppointmentWhatsApp,
    sendAppointmentCancelledWhatsApp,
    sendAppointmentCompletedWhatsApp,
    sendPatientAdmittedWhatsApp
};