
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Authors', [{
    name: 'Kaleigh',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'Karen',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'Bryan',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'Angela',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'Lynn',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),


};
