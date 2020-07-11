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

        // creates a div for each reciepe to go in
        const recipeDivRow = $('<div>', {
          class: 'margin-auto row',
        });

        // creats a div for the like button
        const likeDiv = $('<div>', {
          class: ' margin-auto col-lg-2 col-md-2 col-sm-2',
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

        // creates a div for the favorite count for each of the recipes
        const favDiv = $('<div>', {
          class: 'row favDiv center',
        });
        // creats a p for the favorite count for each of the recipes
        const favCountLabel = $('<p>', {
          class: 'label col',
        }).text(`Number of Likes: ${favoriteCount}`);
        // appends the count to the div
        favDiv.append(favCountLabel);

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
          class: 'title-name-div col-lg-5 col-md-5 col-sm-5 left',
        });
        // appends the recipe name, author and favorite count to the div
        titleNameDiv.append(recipeNameLabel, recipeAuthorLabel, favCountLabel);

        // appends the image, recipe name and author name to the recipe div for each of the recipes
        recipeDivRow.append(imageDiv, titleNameDiv, likeDiv);
        // appends it to the full div
        recipeDiv.append(recipeDivRow);
        // appends it to the page
        recipeDivEl.append(recipeDiv);
      });
    });
  };

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
