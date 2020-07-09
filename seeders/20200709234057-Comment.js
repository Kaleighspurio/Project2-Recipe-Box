
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Comments', [{
    comment: 'These cookies are amazing!',
    commenter_name: 'Alex',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 1,
  }, {
    comment: 'I made these cookies yesterday and they are so good, they are almost all gone!',
    commenter_name: 'Claire',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 1,
  }, {
    comment: 'I made a simple vanilla buttercream to frost this cake and it was so delicious!',
    commenter_name: 'Susan',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    comment: 'I left out the almond extract and put a little extra vanilla and topped this with a peanut butter frosting with peanut butter cups on top. So Good!',
    commenter_name: 'Sara',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    comment: 'Yum! This soup was great!',
    commenter_name: 'Bob',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }], {}),

};
