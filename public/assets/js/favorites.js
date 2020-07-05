const recipeDivEl = $('.favorite-container');

const getFavorites = () => {
  $.ajax({
    method: 'GET',
    url: '/api/',
  }).then((response) => {
    console.log(response);
    response.forEach((recipe) => {
      const recipeName = recipe.name;
      const imageFilePath = recipe.image;
      const recipeID = recipe.id;

      const recipeImgElement = $('<img>', {
        src: imageFilePath,
        'data-id': recipeID,
        width: '150px',
        class: 'recipe-fav',
      });
      const recipeNameLabel = $('<p>', {
        class: 'center',
      }).text(recipeName);
      recipeDivEl.append(recipeImgElement, recipeNameLabel);
    });
  });
};

getFavorites();
