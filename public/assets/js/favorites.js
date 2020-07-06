const recipeDivEl = $('.favorite-container');

const getFavorites = () => {
  // gets the favorite recipes
  $.ajax({
    method: 'GET',
    url: '/api/favorites',
  }).then((response) => {
    console.log(response);
    response.forEach((recipe) => {
      const recipeName = recipe.recipe_name;
      const imageFilePath = recipe.image;
      const recipeID = recipe.id;
      const recipeAuthor = recipe.Author.name;

      // creates a div for each reciepe to go in
      const recipeDiv = $('<div>', {
        class: 'recipe-div rounded center',
        width: '200px',
      });
      // creates an image for each of the recipes
      const recipeImgElement = $('<img>', {
        src: imageFilePath,
        'data-id': recipeID,
        width: '150px',
        class: 'recipe-fav',
      });
      const lineBreak = $('<br>');
      // creates a p for the recipe name for each of the recipes
      const recipeNameLabel = $('<a>', {
        href: `/recipe?id=${response.id}`,
        'data-id': recipeID,
      }).text(recipeName);
      // creates a p for the author name for each of the recipes
      const recipeAuthorLabel = $('<p>', {
        class: 'center',
        'data-id': recipeID,
      }).text(`Author: ${recipeAuthor}`);
      // appends the image, recipe name and author name to the recipe div for each of the recipes
      recipeDiv.append(recipeImgElement, lineBreak, recipeNameLabel, recipeAuthorLabel);
      recipeDivEl.append(recipeDiv);
    });
  });
};

getFavorites();
