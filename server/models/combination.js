module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Combination', {
    combination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
