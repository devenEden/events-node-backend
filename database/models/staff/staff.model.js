const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Staff extends Model {
    static associate(models) {
      this.user = models.Staff.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }

  Staff.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      user_id: {
        type: DataTypes.BIGINT,
      },
      account_active: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      tableName: "staff",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Staff;
};
