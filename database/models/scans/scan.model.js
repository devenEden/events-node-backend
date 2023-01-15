const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Scan extends Model {
    static associate(models) {
      this.event = models.Scan.belongsTo(models.Events, {
        as: "event",
        foreignKey: "event_id",
      });
      this.user = models.Scan.belongsTo(models.User, {
        as: "guest",
        foreignKey: "user_id",
      });
      this.ticket = models.Scan.belongsTo(models.Ticket, {
        as: "ticket",
        foreignKey: "ticket_id",
      });
      this.activity = models.Scan.belongsTo(models.EventActivities, {
        as: "activity",
        foreignKey: "activity_id",
      });
    }
  }

  Scan.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      event_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
      },
      ticket_id: {
        type: DataTypes.BIGINT,
      },
      scan_type: {
        type: DataTypes.STRING,
      },
      activity_id: {
        type: DataTypes.BIGINT,
      },
      scanned_by: {
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      tableName: "scan",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Scan;
};
