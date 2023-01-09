const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class EventImages extends Model {
    static associate(models) {
      this.event = models.EventImages.belongsTo(models.Events, {
        foreignKey: "event_id",
        as: "event",
      });
    }
  }

  EventImages.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      event_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "event_images",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return EventImages;
};
