const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class TicketBooking extends Model {
    static associate(models) {
      this.ticket = models.TicketBooking.belongsTo(models.Ticket, {
        foreignKey: "ticket_id",
        as: "ticket",
      });

      this.event = models.TicketBooking.belongsTo(models.Events, {
        foreignKey: "event_id",
        as: "event",
      });

      this.user = models.TicketBooking.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "ticket_owner",
      });
    }
  }

  TicketBooking.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      ticket_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      is_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_cancelled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "ticket_booking",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return TicketBooking;
};
