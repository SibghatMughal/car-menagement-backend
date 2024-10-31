const nodemailer = require("nodemailer");
module.exports = (toUser, emailSubject, emailMessage) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: process.env.MAIL_NAME,
        address: process.env.MAIL_USER,
      },
      to: toUser,
      subject: emailSubject,
      html: emailMessage,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};
