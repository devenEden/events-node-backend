const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class EventActivities extends Model {
    static associate(models) {
      this.event = models.Staff.belongsTo(models.Events, {
        foreignKey: "event_id",
      });
    }
  }

  EventActivities.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      name: {
        type: DataTypes.STRING,
      },
      event_id: {
        type: DataTypes.BIGINT,
      },
      description: {
        type: DataTypes.STRING,
      },
      start_time: {
        type: DataTypes.DATE,
      },
      end_time: {
        type: DataTypes.DATE,
      },
      is_recurring: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      tableName: "event_activities",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return EventActivities;
};
