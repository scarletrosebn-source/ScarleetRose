const dotenv = require("dotenv");
dotenv.config();

const sendmail = require("../sendEmail.js");

const sendCustomerMailAndNotifyAdmin = async (to, subject, message) => {
    const subject_for_customer = `Thank you for contacting ${process.env.APP_NAME}!`;
    const message_for_customer = `Hi there,

Thank you for reaching out to ${process.env.APP_NAME}. We have received your message and will get back to you as soon as possible.

Best regards,
The ${process.env.APP_NAME} Team`;
    const subject_for_admin = `New Support Ticket from ${process.env.APP_NAME}`;
    const message_for_admin = `You have received a new support ticket. Please check the admin panel for details.

    From: ${to}

    Subject: ${subject}

    Message: ${message}
    `;
    await sendmail(to, subject_for_customer, message_for_customer);
    await sendmail(process.env.ADMIN_EMAIL, subject_for_admin, message_for_admin);
};

module.exports = sendCustomerMailAndNotifyAdmin;