$(document).ready(() => {
  const startRecipes = $('.on-load-recipes');

  let category;
  let ingredient;
  let author;
  let searchChoice;
  let selection;
  let restriction;
  let favoriteCount;
  let favObj = {};
  let recipeID;

  // hide the different searches on page load
  $('.category-input').addClass('hide');
  $('.ingredient-input').addClass('hide');
  $('.author-input').addClass('hide');
  $('.diet-input').addClass('hide');
  $('.search-btn').addClass('hide');

  // when the search select is selected
  // add or hide other selects to show what was selected for the search
  $('.search').on('change', () => {
    searchChoice = $('.search').val();
    if (searchChoice === 'category') {
      selection = 'category';
      $('.category-input').removeClass('hide');
      $('.ingredient-input').addClass('hide');
      $('.author-input').addClass('hide');
      $('.diet-input').addClass('hide');
      $('.search-btn').removeClass('hide');
    } else if (searchChoice === 'ingredient') {
      selection = 'ingredient';
      $('.ingredient-input').removeClass('hide');
      $('.category-input').addClass('hide');
      $('.author-input').addClass('hide');
      $('.diet-input').addClass('hide');
      $('.search-btn').removeClass('hide');
    } else if (searchChoice === 'author') {
      selection = 'author';
      $('.author-input').removeClass('hide');
      $('.category-input').addClass('hide');
      $('.ingredient-input').addClass('hide');
      $('.diet-input').addClass('hide');
      $('.search-btn').removeClass('hide');
    } else if (searchChoice === 'restriction') {
      selection = 'restriction';
      $('.diet-input').removeClass('hide');
      $('.category-input').addClass('hide');
      $('.ingredient-input').addClass('hide');
      $('.author-input').addClass('hide');
      $('.search-btn').removeClass('hide');
    } else if (searchChoice === 'cat-ing') {
      selection = 'cat-ing';
      $('.category-input').removeClass('hide');
      $('.ingredient-input').removeClass('hide');
      $('.author-input').addClass('hide');
      $('.diet-input').addClass('hide');
      $('.search-btn').removeClass('hide');
    } else if (searchChoice === 'cat-res') {
      selection = 'cat-res';
      $('.category-input').removeClass('hide');
      $('.ingredient-input').addClass('hide');
      $('.author-input').addClass('hide');
      $('.diet-input').removeClass('hide');
      $('.search-btn').removeClass('hide');
    }
  });

  // resuable function to make all the elments and put in the cooresponding recipe information
  const createRecipes = (response) => {
    response.forEach((recipe) => {
      const recipeName = recipe.recipe_name;
      let imageFilePath = recipe.image;
      recipeID = recipe.id;
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
      titleNameDiv.append(recipeNameLabel, recipeAuthorLabel);

      // appends the image, recipe name and author name to the recipe div for each of the recipes
      recipeDiv.append(imageDiv, titleNameDiv, likeDiv);
      // appends it to the page
      startRecipes.append(recipeDiv);
    });
  };

  const pageLoad = () => {
    // on page load - get recent recipes
    $.ajax({
      method: 'GET',
      url: '/api/recent',
    }).then((response) => {
      console.log(response);
      // change the title
      $('.search-header').text('Recently Submitted Recipes');
      // run the createRecipes function to dynamically put it on the page
      createRecipes(response);
    });
  };

  const categorySearch = (searchedCategory) => {
    // get the category specific info
    $.ajax({
      method: 'GET',
      url: `/api/category/${searchedCategory}`,
    }).then((response) => {
      console.log('after category search', response);
      // empty the current recipes that are being displayed
      startRecipes.empty();
      // run the createRecipes function to dynamically put it on the page
      createRecipes(response);
    });
  };

  const restrictionSearch = (searchedRestriction) => {
    // get the restriction specific info
    $.ajax({
      method: 'GET',
      url: `/api/restriction/${searchedRestriction}`,
    }).then((response) => {
      console.log('restriction search', response);
      // empty the current recipes that are being displayed
      startRecipes.empty();
      // run the createRecipes function to dynamically put it on the page
      createRecipes(response);
    });
  };

  const ingredientSearch = (searchedIngredient) => {
    // get the ingredient specific info
    $.ajax({
      method: 'GET',
      url: `/api/ingredient/${searchedIngredient}`,
    }).then((response) => {
      console.log('ingredient search', response);
      // empty the current recipes that are being displayed
      startRecipes.empty();
      // run the createRecipes function to dynamically put it on the page
      createRecipes(response);
    });
  };

  const categoryIngredient = (cat, ingred) => {
    // get the category + ingredient specific info
    $.ajax({
      method: 'GET',
      url: `/api/category/${cat}/ingredient/${ingred}`,
    }).then((response) => {
      console.log('category ingredient', response);
      // empty the current recipes that are being displayed
      startRecipes.empty();
      // run the createRecipes function to dynamically put it on the page
      createRecipes(response);
    });
  };

  const categoryRestriction = (cate, rest) => {
    // get the category + restriction specific info
    $.ajax({
      method: 'GET',
      url: `/api/category/${cate}/restriction/${rest}`,
    }).then((response) => {
      console.log('category restriction response', response);
      // empty the current recipes that are being displayed
      startRecipes.empty();
      // run the createRecipes function to dynamically put it on the page
      createRecipes(response);
    });
  };

  const authorSearch = (searchedAuthor) => {
    $.ajax({
      method: 'GET',
      url: `/api/author/${searchedAuthor}`,
    }).then((response) => {
      console.log('author search', response);
      // empty the current recipes that are being displayed
      startRecipes.empty();
      // run the createRecipes function to dynamically put it on the page
      createRecipes(response);
    });
  };

  $('.search-btn').on('click', (event) => {
    event.preventDefault();
    // check what was selected to search
    // run the function that cooresponds to that specific search
    // changes the title to show what is being searched
    if (selection === 'category') {
      category = $('#category-select').val();
      $('.search-header').text(`${category} Recipes`);
      categorySearch(category);
      $('#category-select').val('select');
    } else if (selection === 'author') {
      author = $('.auth-input').val();
      $('.search-header').text(`Recipes By ${author}`);
      authorSearch(author);
      $('.auth-input').val('');
    } else if (selection === 'ingredient') {
      ingredient = $('.ingred-input').val();
      $('.search-header').text(`Recipes That Include ${ingredient}`);
      ingredientSearch(ingredient);
      $('.ingred-input').val('');
    } else if (selection === 'restriction') {
      restriction = $('.diet-input').val();
      $('.search-header').text(`${restriction} Recipes`);
      restrictionSearch(restriction);
      $('.diet-input').val('select');
    } else if (selection === 'cat-ing') {
      category = $('#category-select').val();
      ingredient = $('.ingred-input').val();
      $('.search-header').text(`${category} Recipes Containing ${ingredient}`);
      categoryIngredient(category, ingredient);
      $('#category-select').val('select');
      $('.ingred-input').val('');
    } else if (selection === 'cat-res') {
      category = $('#category-select').val();
      restriction = $('.diet-input').val();
      $('.search-header').text(`${restriction} ${category} Recipes`);
      categoryRestriction(category, restriction);
      $('#category-select').val('select');
      $('.diet-input').val('select');
    }
  });

  // when the like button is clicked
  $(document).on('click', '.like-btn-index', function (event) {
    event.preventDefault();
    $(this).removeClass('btn-outline-secondary');
    $(this).addClass('btn-secondary');
    // find it's recipe id
    const id = $(this).data('id');
    // find it's current like count
    favoriteCount = $(this).data('likes');
    // update the like count
    favoriteCount += 1;

    // create objec to send to the backend
    favObj = {
      favoriteCount,
    };
    console.log(favObj);
    // make a put request to change the favorite count
    $.ajax({
      method: 'PUT',
      url: `/api/${id}`,
      data: favObj,
    }).then(() => {
      console.log('fav count updated');
    });
  });

  pageLoad();
});
