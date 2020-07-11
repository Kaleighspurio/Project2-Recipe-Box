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
    dietary_restriction: {
      type: Datatypes.STRING,
      defaultValue: 'None',
    },
    favorite_count: {
      type: Datatypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    special_notes: {
      type: Datatypes.TEXT,
      defaultValue: '',
    },
    image: Datatypes.STRING,
    url_source: {
      type: Datatypes.STRING,
      defaultValue: '',
    },
  });

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Ingredient, {
      onDelete: 'cascade',
    });
    Recipe.hasMany(models.Comment, {
      onDelete: 'cascade',
    });
    Recipe.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Recipe;
};
