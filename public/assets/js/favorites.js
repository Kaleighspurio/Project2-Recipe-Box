$(document).ready(() => {
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
        const recipeCat = recipe.category;
        const recipeNotes = recipe.special_notes;
        const favoriteCount = recipe.favorite_count;
        let recipeImage = recipe.image;

        if (recipeImage === null) {
          recipeImage = './assets/images/uploads/plate.png';
        }

        const rowDiv = $('<div>', {
          class: 'container rounded favorite-container row rowDiv',
          width: '500px',
        });
        // creates a div for each reciepe to go in
        const recipeDivRight = $('<div>', {
          class: 'recipe-div col center rec-div-right rec-right',
          width: '200px',
        });

        const recipeDivLeft = $('<div>', {
          class: 'recipe-div col rounded center rec-left',
          width: '200px',
        });

        const notesDiv = $('<div>', {
          class: 'row notesDiv',
          width: '500px',
        });
        const notesDivLabel = $('<p>', {
          class: 'underline label-font notesDivLabel',
        }).text('Special Notes:');

        const notes = $('<p>', {
          class: 'notes label-font-smaller',
        }).text(`${recipeNotes}`);

        // creates a like button for each of the recipes
        const likeButton = $('<button>', {
          class: 'btn btn-outline-secondary like-btn',
        });
        const icon = $('<i>', {
          class: 'fa fa-thumbs-up',
        });
        likeButton.append(icon);

        // creates an image for each of the recipes
        const recipeImgElement = $('<img>', {
          src: recipeImage,
          'data-id': recipeID,
          width: '150px',
          class: 'recipe-fav image-margin',
        });

        // creates an a for the recipe name for each of the recipes
        const recipeNameLabel = $('<a>', {
          href: `/recipe?id=${recipeID}`,
          'data-id': recipeID,
          class: 'image-font',
        }).text(recipeName);

        // creates a p for the category name for each of the recipes
        const categoryLabel = $('<p>', {
          class: 'center  label-font',
        }).text(recipeCat);
        // creates a p for the author name for each of the recipes
        const recipeAuthorLabel = $('<p>', {
          class: 'center  label-font',
          'data-id': recipeID,
        }).text(`Author: ${recipeAuthor}`);
        // creates a p for the favorite count for each of the recipes
        const favDiv = $('<div>', {
          class: 'row favDiv',
          width: '500px',
        });
        const favCountLabel = $('<p>', {
          class: 'underline label-font',
        }).text('Number of Likes:');

        const favCount = $('<p>', {
          class: 'center label-font-fav',
        }).text(`${favoriteCount}`);
        // appends the image, recipe name and author name to the recipe div for each of the recipes
        notesDiv.append(notesDivLabel, notes);
        favDiv.append(favCountLabel, favCount);
        recipeDivLeft.append(recipeImgElement);

        recipeDivRight.append(
          recipeNameLabel,
          categoryLabel,
          recipeAuthorLabel,
        );
        rowDiv.append(recipeDivLeft, recipeDivRight, favDiv, notesDiv, likeButton);
        recipeDivEl.append(rowDiv);
      });
    });
  };

  getFavorites();
});
