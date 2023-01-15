const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Ticket extends Model {
    static associate(models) {
      this.event = models.Ticket.belongsTo(models.Events, {
        foreignKey: "event_id",
        as: "event",
      });

      this.bookings = models.Ticket.hasMany(models.TicketBooking, {
        foreignKey: "ticket_id",
        as: "bookings",
      });
    }
  }

  Ticket.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      available_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sales_start: {
        type: DataTypes.DATE,
      },
      sales_end: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "tickets",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Ticket;
};
