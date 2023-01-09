class httpResponse {
  constructor() {
    this.statusCode = null;
    this.message = null;
    this.type = false;
    this.data = [];
  }

  /**
   * Set Success HTTP Response
   *
   * @param {BigInteger} statusCode Success Status Code
   * @param {String} message Success Message
   * @param {Array} data Nullable array of data to be attached to the success response
   */
  setSuccess(statusCode, message, data = []) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = true;
    this.data = data;
  }

  /**
   * Set Error HTTP Response
   *
   * @param {String} statusCode Error status code
   * @param {String} message Error Message
   */
  setError(statusCode, message, errorData = []) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = false;
    this.data = errorData;
  }

  send(res) {
    const response = {
      server: {
        status: this.type,
        message: this.message,
      },
      ...this.data,
    };

    return res.status(this.statusCode).json({
      ...response,
    });
  }

  download(res) {
    return res.download(this.data.path);
  }
}

module.exports = httpResponse;
