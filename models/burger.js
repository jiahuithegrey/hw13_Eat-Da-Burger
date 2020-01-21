module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    text: {
      burger_name: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      dafaultValue: false
    }
  });
  return Burger;
};
