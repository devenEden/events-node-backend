const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class UserToken extends Model {}

  UserToken.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      email: {
        type: DataTypes.STRING,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp_code: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      expires: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "user_tokens",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return UserToken;
};
