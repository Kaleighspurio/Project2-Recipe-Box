module.exports = (sequelize, Datatypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipe_name: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    instructions: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
    serving_size: Datatypes.STRING,
    category: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    dietary_restriction: Datatypes.STRING,
    favorite_count: Datatypes.INTEGER,
    special_notes: Datatypes.TEXT,
    image: Datatypes.STRING,
  });

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Ingredient, {
      onDelete: 'cascade',
    });
  };

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Comment, {
      onDelete: 'cascade',
    });
  };

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Recipe;
};
