module.exports = (sequelize, Datatypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    ingredient_name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Ingredient;
};
