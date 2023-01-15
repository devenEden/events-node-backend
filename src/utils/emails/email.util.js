require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const winston = require("winston");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailUtil {
  constructor() {
    this.emailMessage = {
      to: "",
      from: process.env.EMAIL_FROM,
      subject: "",
      text: "EVENTS APP EMAIL NOTIFICATION",
      html: "",
      attachments: [],
    };
    this.attachmentOptions = {
      content: "",
      filename: "",
      type: "application/pdf",
      disposition: "attachment",
    };
  }

  getAttachmentOptions() {
    return this.attachmentOptions;
  }
  setAttachmentOptions(content, filename) {
    this.attachmentOptions.content = content;
    this.attachmentOptions.filename = filename;
  }
  /**
   *  this sets the email message body
   * @param {*} to the email who the email is going to
   * @param {*} subject the subject of the email
   * @param {*} html the emails html
   */
  setEmailMessage(to, subject, html, attachments) {
    this.emailMessage.to = to;
    this.emailMessage.subject = subject;
    this.emailMessage.html = html;
    this.emailMessage.attachments = attachments;
  }
  /**
   *  this sends  the email message body
   * @param {*} to the email who the email is going to
   * @param {*} subject the subject of the email
   * @param {*} html the emails html
   */
  sendMessage(to, subject, html, attachment) {
    this.setEmailMessage(to, subject, html, attachment);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail
      .send(this.emailMessage)
      .then(() => {
        winston.log("info", "Email Sent");
      })
      .catch((error) => {
        winston.log("info", `Email Error: ${error.message}`);
      });
  }
}

module.exports = EmailUtil;
