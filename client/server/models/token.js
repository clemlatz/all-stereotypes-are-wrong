const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Token', {
    token: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return crypto.randomBytes(32).toString('hex');
      },
    },
    combination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
