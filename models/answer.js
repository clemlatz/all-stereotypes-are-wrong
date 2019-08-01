module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Answer', {
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    combination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
