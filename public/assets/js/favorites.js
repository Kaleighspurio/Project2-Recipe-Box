$(document).ready(() => {
  const recipeDivEl = $('.favorite-container');
  let favoriteCount;
  let favObj;

  const getFavorites = () => {
    // gets the favorite recipes
    $.ajax({
      method: 'GET',
      url: '/api/favorites',
    }).then((response) => {
      console.log(response);
      response.forEach((recipe) => {
        console.log(recipe);

        const recipeName = recipe.recipe_name;
        let imageFilePath = recipe.image;
        const recipeID = recipe.id;
        const recipeAuthor = recipe.Author.name;
        favoriteCount = recipe.favorite_count;
        // const specialNotes = recipe.special_notes;

        if (imageFilePath === null) {
          imageFilePath = './assets/images/uploads/plate.png';
        }

        const recipeDiv = $('<div>', {
          class: 'recipe-div rounded row',
          width: '600px',
        });
        // creates a div for each reciepe to go in
        const recipeDivRow1 = $('<div>', {
          class: 'margin-auto row',
          width: '600px',
        });

        const recipeDivRow2 = $('<div>', {
          class: ' margin-auto col',
        });
        // creates a like button for each of the recipes
        const likeButton = $('<button>', {
          class: 'btn btn-outline-secondary like-btn-index',
          data: 'likes',
          favoriteCount,
        });
        const icon = $('<i>', {
          class: 'fa fa-thumbs-up',
        });
        likeButton.append(icon);

        // creates an image for each of the recipes
        const imageDiv = $('<div>', {
          class: 'image-div center col-3',
        });
        const recipeImgElement = $('<img>', {
          src: imageFilePath,
          'data-id': recipeID,
          height: '150px',
          class: 'recipe-fav',
        });
        imageDiv.append(recipeImgElement);

        // creates a p for the favorite count for each of the recipes
        const favDiv = $('<div>', {
          class: 'row favDiv center',
        });
        const favCountLabel = $('<p>', {
          class: 'label col',
        }).text(`Number of Likes: ${favoriteCount}`);

        favDiv.append(favCountLabel);

        // creates a p for the recipe name for each of the recipes
        const recipeNameLabel = $('<a>', {
          href: `/recipe?id=${recipeID}`,
          'data-id': recipeID,
          class: 'recipe-name-label',
        }).text(recipeName);
        // creates a p for the author name for each of the recipes
        const recipeAuthorLabel = $('<p>', {
          class: 'label',
          'data-id': recipeID,
        }).text(`Author: ${recipeAuthor}`);
        const titleNameDiv = $('<div>', {
          class: 'title-name-div col-6 left',
        });
        titleNameDiv.append(recipeNameLabel, recipeAuthorLabel, favCountLabel);

        // appends the image, recipe name and author name to the recipe div for each of the recipes
        recipeDivRow2.append(likeButton);
        recipeDivRow1.append(imageDiv, titleNameDiv, recipeDivRow2);

        recipeDiv.append(recipeDivRow1);
        recipeDivEl.append(recipeDiv);
      });
    });
  };

  // not sure why this click isn't working
  $(document).on('click', '.like-btn-index', function (event) {
    event.preventDefault();
    let favorites = $(this).data('likes', favoriteCount);
    console.log(favorites);
    favorites += 1;
    console.log(favorites);
    favObj = {
      favorites,
    };
    console.log(favObj);
    $.ajax({
      method: 'PUT',
      url: `/api/view/favorites/${favorites}`,
      data: favObj,
    }).then(() => {
      window.location.reload();
    });
  });

  getFavorites();
});
