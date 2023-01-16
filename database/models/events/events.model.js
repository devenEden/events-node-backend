const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Events extends Model {
    static associate(models) {
      this.user = models.Events.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "event_owner",
      });

      this.eventImages = models.Events.hasMany(models.EventImages, {
        foreignKey: "event_id",
        as: "event_images",
      });

      this.bookings = models.Events.hasMany(models.TicketBooking, {
        foreignKey: "event_id",
        as: "booked_tickets",
      });

      this.tickets = models.Events.hasMany(models.Ticket, {
        foreignKey: "event_id",
        as: "tickets",
      });

      this.scans = models.Events.hasMany(models.Scan, {
        foreignKey: "event_id",
        as: "event_scans",
      });

      this.activities = models.Events.hasMany(models.EventActivities, {
        foreignKey: "event_id",
        as: "activities",
      });
    }
  }

  Events.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      event_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location_link: {
        type: DataTypes.STRING,
      },
      age_limit: {
        type: DataTypes.INTEGER,
      },
      is_private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_cancelled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "events",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Events;
};
