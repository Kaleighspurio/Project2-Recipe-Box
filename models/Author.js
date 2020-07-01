module.exports = (sequelize, Datatypes) => {
  const Author = sequelize.define('Author', {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  Author.associate = (models) => {
    Author.hasMany(models.Recipe, {
      onDelete: 'cascade',
    });
  };
  return Author;
};
