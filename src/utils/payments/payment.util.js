require("dotenv").config();
const Flutterwave = require("flutterwave-node-v3");

class PaymentGateway {
  constructor() {
    this.paymentDetails = {};
    this.successfull = "successful";
    this.flw = new Flutterwave(
      process.env.FLW_PUBLIC_KEY,
      process.env.FLW_SECRET_KEY
    );
  }

  /**
   *  set payload for payment
   * @param {Object} payload
   */
  setPaymentDetails(payload) {
    this.paymentDetails = { ...payload };
  }

  /**
   *get payment details
   * @returns payment details
   */
  getPaymentDetails() {
    return this.paymentDetails;
  }

  /**
   * make uganda mobile money payment
   * @returns rediret link for one time password
   */
  async ugandaMobileMoney() {
    const payment = await this.flw.MobileMoney.uganda(this.paymentDetails);

    return payment;
  }

  /**
   * verify any type of transaction
   * @returns payload with transaction
   */
  async verifyTransaction() {
    const payment = await this.flw.Transaction.verify(this.paymentDetails);

    return payment;
  }
}

module.exports = PaymentGateway;
