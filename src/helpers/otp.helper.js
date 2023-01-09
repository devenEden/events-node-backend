/**
 * generates random characters based on given length
 *
 * @param {Number} length length of selected onetime password
 * @returns {String} one time password in string format
 */
const otpGenerator = (length) => {
  let alphabetLowerCase = "abcdefghijklmnopqrstuvwxyz".split("");
  let alphabetUpperCase = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let symbols = "!@#$%*?".split("");

  const alphanumeric = [
    ...numbers,
    ...symbols,
    ...alphabetLowerCase,
    ...alphabetUpperCase,
  ];

  let opt = "";

  for (let index = 1; index <= length; index++) {
    let char = Math.floor(Math.random() * 70);

    opt += alphanumeric[char];
  }

  return opt;
};

module.exports = otpGenerator;
