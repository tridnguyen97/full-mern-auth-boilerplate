const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4        
      },
      email: {
        type: DataTypes.STRING,
        require: true
      },
      name: {
        type: DataTypes.STRING,
        require: true
      },
      hashed_password: {
        type: DataTypes.STRING,
        require: true
      },
      salt: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING,
        default: "subscriber"
      },
      resetPasswordLink: {
        type: DataTypes.STRING,
        default: ''
      }
    }
  )

  User.prototype.authenticate = function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  User.prototype.encryptPassword = function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }

  User.prototype.makeSalt= function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
  return User;
}