const EmailUtil = require("./emails/email.util");
const {
  emailForgotPasswordTemplate,
} = require("./emails/etemplates/fogotPassword");
const {
  emailNotificationTemplate,
} = require("./emails/etemplates/notification");
const { emailRegistrationTemplate } = require("./emails/etemplates/register");

module.exports = {
  EmailUtil,
  emailNotificationTemplate,
  emailForgotPasswordTemplate,
  emailRegistrationTemplate,
};
