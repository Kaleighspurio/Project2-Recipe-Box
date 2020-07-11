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
          // width: '600px',
        });
        // creates a div for each reciepe to go in
        const recipeDivRow = $('<div>', {
          class: 'margin-auto row',
          // width: '600px',
        });

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
        likeButton.append(icon);
        likeDiv.append(likeButton);

        // creates an image for each of the recipes
        const imageDiv = $('<div>', {
          class: 'image-div center col-lg-3 col-md-3 col-sm-3',
        });
        const recipeImgElement = $('<img>', {
          src: imageFilePath,
          'data-id': recipeID,
          class: 'recipe-img',
        });
        imageDiv.append(recipeImgElement);

        // creates a p for the favorite count for each of the recipes
        const favDiv = $('<div>', {
          class: 'row favDiv center',
        });
        const favCountLabel = $('<p>', {
          class: 'label col',
        }).text(`Number of Likes: ${favoriteCount}`);
        // const favCount = $('<p>', {
        //   class: 'label-font-fav col',
        // }).text(`${favoriteCount}`);
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
          class: 'title-name-div col-lg-5 col-md-5 col-sm-5 left',
        });
        titleNameDiv.append(recipeNameLabel, recipeAuthorLabel, favCountLabel);

        // appends the image, recipe name and author name to the recipe div for each of the recipes

        recipeDivRow.append(imageDiv, titleNameDiv, likeDiv);

        recipeDiv.append(recipeDivRow);
        recipeDivEl.append(recipeDiv);
      });
    });
  };

  $(document).on('click', '.like-btn-index', function (event) {
    event.preventDefault();
    const id = $(this).data('id');
    favoriteCount = $(this).data('likes');
    favoriteCount += 1;
    console.log(favoriteCount);

    favObj = {
      favoriteCount,
    };
    console.log(favObj);
    $.ajax({
      method: 'PUT',
      url: `/api/favorites/${id}`,
      data: favObj,
    }).then(() => {
      console.log('fav count updated');
      window.location.reload();
    });
  });

  getFavorites();
});
