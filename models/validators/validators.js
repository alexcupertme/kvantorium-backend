const config = require("../../config/db");
const validator = require("validator");

class Field {
  constructor(props) {
    this.value = props.value;
    this.minLength = props.minLength;
    this.maxLength = props.maxLength;
  }
  get isNotEmpty() {
    return !validator.isEmpty(this.value, { ignore_whitespace: true });
  }
  get isMatchLength() {
    return validator.isLength(this.value, {
      min: this.minLength,
      max: this.maxLength,
    });
  }
  //   get isEmail() {
  //     return validator.isEmail(this.value);
  //   }
  //   get isNickname() {
  //     let regExp = /^\b[a-zA-Z][a-zA-Z0-9]\w+$/g;
  //     return (this.value.match(regExp) || [])[0];
  //   }
  get isNumber() {
    let regExp = /^[-0-9]+$/g;
    return (this.value.match(regExp) || [])[0];
  }
  get isObject() {
    return typeof this.value === "object" && this.value !== null;
  }
}

// class Password extends Field {}
// class Login extends Field {}
// class Email extends Field {}
// class Id extends Field {}
// class  extends Field {}

// module.exports.checkAuth = function (login, password) {
//   if (validator.isEmpty(login) || validator.isEmpty(password)) {
//     return "ERROR_EMPTY_FIELD";
//   } else if (!(3 <= login.length <= 30) || !(1 <= mail.length)) {
//     return "ERROR_BAD_LENGTH";
//   } else return "SUCCESS";
// };

// module.exports.checkRegistration = function (login, password, mail, name) {};

// module.exports.checkQuery = function (token) {};

// module.exports.checkSetStats = function (query, userdata, userdb) {};

// module.exports.checkIsNotEmpty = function (value) {
//   let field = new Field({ value });
//   return field.isNotEmpty;
// };

// module.exports.checkNickname = function (value) {
//   let field = new Field({ value });
//   return field.isNickname;
// };
