
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Recipes', [{
    recipe_name: 'Dutch Cocoa Cookies',
    instructions: 'In a mixing bowl, combine the flour, cocoa, salt, and baking soda. \n  In a separate large mixing bowl, cream together the softened butter and sugar.  Then add eggs and vanilla and mix.\n Stir in the flour mixture. \n Chill in refrigerator for 1-2 hours. \n Preheat the oven to 350 degrees F.  Then roll the dough into balls about 1 inch in diameter and roll them in granulated sugar to coat. \n Bake on an ungreased cookie sheet for 11-12 minutes, careful not to overbake.',
    serving_size: '2-3 dozen',
    category: 'Desserts',
    dietary_restriction: null,
    favorite_count: null,
    special_notes: 'Make sure you use Dutch Process Cocoa!',
    image: null,
    url_source: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    AuthorId: 1,
  }, {
    recipe_name: 'Almond Yellow Cake',
    instructions: 'Preheat oven to 350 degrees F. \n In a large bowl, combine the flour, sugar, baking powder and salt. \n Add the milk, vegetable oil, and softened butter to the flour mixture and beat on medium/high for 2 minutes. \n Add the eggs, vanilla, and almond extract and beat again on medium/high speed for 2 additional minutes. \n Pour into 2 round 9-inch cake pans and bake for 20-25 minutes. \n Allow to cool before frosting with your favorite frosting!',
    serving_size: '12',
    category: 'Desserts',
    dietary_restriction: null,
    favorite_count: null,
    special_notes: '',
    image: null,
    url_source: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    AuthorId: 1,
  }, {
    recipe_name: 'Chicken Tortilla Soup',
    instructions: 'In a large pot, saute oil, onion, garlic and peppers for just a few minutes until they begin to soften. \n Add all of the other ingredients, including the whole chicken breasts, bring to a boil, then cover and simmer for 30 minutes. \n Pull the chicken breasts out of the pot and shred them apart using forks.  Return the shredded chicken to the pot. \n Season with salt and pepper to taste and serve with tortilla chips.',
    serving_size: '6',
    category: 'Soups',
    dietary_restriction: null,
    favorite_count: null,
    special_notes: 'Add some fresh lime juice before serving!',
    image: null,
    url_source: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    AuthorId: 1,
  }], {}),


  // down: (queryInterface, Sequelize) => {
  //   /*
  //     Add reverting commands here.
  //     Return a promise to correctly handle asynchronicity.

  //     Example:
  //     return queryInterface.bulkDelete('People', null, {});
  //   */
  // }
};
