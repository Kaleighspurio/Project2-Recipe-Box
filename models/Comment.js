module.exports = (sequelize, Datatypes) => {
  const Comment = sequelize.define('Comment', {
    comment: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
    commenter_name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Comment;
};
