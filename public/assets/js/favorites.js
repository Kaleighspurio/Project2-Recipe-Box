const recipeDivEl = $('.favorite-container');

const getFavorites = () => {
  // gets the favorite recipes
  $.ajax({
    method: 'GET',
    url: '/api/favorites',
  }).then((response) => {
    console.log(response);
    response.forEach((recipe) => {
      const recipeName = recipe.name;
      const imageFilePath = recipe.image;
      const recipeID = recipe.id;
      const recipeAuthor = recipe.author;

      // creates an image for each of the recipes
      const recipeImgElement = $('<img>', {
        src: imageFilePath,
        'data-id': recipeID,
        width: '150px',
        class: 'recipe-fav',
      });

      // creates a p for the recipe name for each of the recipes
      const recipeNameLabel = $('<p>', {
        class: 'center',
      }).text(recipeName);
      // creates a p for the author name for each of the recipes
      const recipeAuthorLabel = $('<p>', {
        class: 'center',
      }).text(recipeAuthor);
      // appends the image, recipe name and author name to the recipe div for each of the recipes
      recipeDivEl.append(recipeImgElement, recipeNameLabel, recipeAuthorLabel);
    });
  });
};

getFavorites();
