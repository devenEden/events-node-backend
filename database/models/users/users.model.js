const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      this.events = models.User.hasMany(models.Events, {
        foreignKey: "user_id",
        as: "events",
      });

      this.ticket = models.User.hasMany(models.TicketBooking, {
        foreignKey: "user_id",
        as: "tickets",
      });
    }
  }

  User.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      other_names: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      gender: {
        type: DataTypes.STRING,
      },
      date_of_birth: {
        type: DataTypes.DATE,
      },
      contact: {
        type: DataTypes.STRING,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      email_verified_at: {
        type: DataTypes.DATE,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "users",
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
    }
  );

  return User;
};
