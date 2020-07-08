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
      // const imageFilePath = recipe.image;
      const recipeID = recipe.id;
      const recipeAuthor = recipe.Author.name;
      const recipieCat = recipe.category;
      const favoriteCount = recipe.favorite_count;
      let recipeImage = recipe.image;

      if (recipeImage === null) {
        recipeImage = './assets/images/uploads/plate.png';
      }
      // creates a div for each reciepe to go in
      const recipeDiv = $('<div>', {
        class: 'recipe-div rounded center',
        width: '200px',
      });
      // creates an image for each of the recipes
      const recipeImgElement = $('<img>', {
        src: recipeImage,
        'data-id': recipeID,
        width: '150px',
        class: 'recipe-fav',
      });

      const lineBreak = $('<br>');
      // creates a p for the recipe name for each of the recipes
      const recipeNameLabel = $('<a>', {
        href: `/recipe?id=${recipeID}`,
        'data-id': recipeID,
      }).text(recipeName);

      // creates a p for the category name for each of the recipes
      const categoryLabel = $('<p>', {
        class: 'center label-margin',
      }).text(recipieCat);
      // creates a p for the author name for each of the recipes
      const recipeAuthorLabel = $('<p>', {
        class: 'center label-margin',
        'data-id': recipeID,
      }).text(`Author: ${recipeAuthor}`);
      // creates a p for the favorite count for each of the recipes
      const favCount = $('<p>', {
        class: 'center label-margin',
      }).text(`Number of Likes: ${favoriteCount}`);
      // appends the image, recipe name and author name to the recipe div for each of the recipes
      recipeDiv.append(
        recipeImgElement,
        lineBreak,
        recipeNameLabel,
        categoryLabel,
        recipeAuthorLabel,
        favCount
      );
      recipeDivEl.append(recipeDiv);
    });
  });
};

getFavorites();
