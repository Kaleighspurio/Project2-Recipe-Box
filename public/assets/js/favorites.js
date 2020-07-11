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

        // if there is no image, put in a placeholder image
        if (imageFilePath === null) {
          imageFilePath = './assets/images/uploads/plate.png';
        }

        // create a div to put everything in
        const recipeDiv = $('<div>', {
          class: 'recipe-div rounded row',
        });

        // creats a div for the like button
        const likeDiv = $('<div>', {
          class: 'like-div col-lg-3 col-md-3 col-sm-3',
        });
        // creates a like button for each of the recipes
        const likeButton = $('<button>', {
          class: 'btn btn-outline-secondary like-btn-index',
        })
          .attr('data-id', recipeID)
          .attr('data-likes', favoriteCount);
        console.log(recipeID);

        const icon = $('<i>', {
          class: 'fa fa-thumbs-up',
        });

        // appends the like icon to the button
        likeButton.append(icon);
        // appenends the like button to the div
        likeDiv.append(likeButton);

        // creates a div and an image for each of the recipes
        const imageDiv = $('<div>', {
          class: 'image-div center col-lg-3 col-md-3 col-sm-3',
        });
        const recipeImgElement = $('<img>', {
          src: imageFilePath,
          'data-id': recipeID,
          class: 'recipe-img',
        });
        // appends the image to the div
        imageDiv.append(recipeImgElement);

        // creates a p for the number of likes and the count for each recipe
        const favCountLabel = $('<p>', {
          class: 'label col',
        }).text(`Number of Likes: ${favoriteCount}`);

        // creates an a for the recipe name for each of the recipes
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
        // creats a div
        const titleNameDiv = $('<div>', {
          class: 'title-name-div col-lg-6 col-md-6 col-sm-6 left',
        });
        // appends the recipe name, author and favorite count to the div
        titleNameDiv.append(recipeNameLabel, recipeAuthorLabel, favCountLabel);

        // appends the image, recipe name and author name to the recipe div for each of the recipes
        recipeDiv.append(imageDiv, titleNameDiv, likeDiv);
        // appends it to the page
        recipeDivEl.append(recipeDiv);
      });
    });
  };

  // creats a p for the favorite count for each of the recipes

  // when the like button is clicked
  $(document).on('click', '.like-btn-index', function (event) {
    event.preventDefault();
    // the id is found by it's data-id
    const id = $(this).data('id');
    favoriteCount = $(this).data('likes');
    // the favorite count is changed
    favoriteCount += 1;
    // object is made to send to the backend
    favObj = {
      favoriteCount,
    };
    // put request is made to change the favorite count
    $.ajax({
      method: 'PUT',
      url: `/api/favorites/${id}`,
      data: favObj,
    }).then(() => {
      console.log('fav count updated');
      // reload the page to show the change
      window.location.reload();
    });
  });

  getFavorites();
});
