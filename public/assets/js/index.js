const startRecipes = $('.on-load-recipes');
let category;
let ingredient;
let author;
let searchChoice;
let selection;
let restriction;
// let favorites;
// let favObj = {};
let recipeID;

$('.category-input').addClass('hide');
$('.ingredient-input').addClass('hide');
$('.author-input').addClass('hide');
$('.diet-input').addClass('hide');
$('.search-btn').addClass('hide');

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

const createRecipes = (response) => {
  response.forEach((recipe) => {
    console.log(recipe);

    const recipeName = recipe.recipe_name;
    let imageFilePath = recipe.image;
    recipeID = recipe.id;
    const recipeAuthor = recipe.Author.name;
    const favoriteCount = recipe.favorite_count;
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
      class: ' margin-auto',
    });
    // creates a like button for each of the recipes
    const likeButton = $('<button>', {
      class: 'btn btn-outline-secondary like-btn-index col',
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
      class: 'title-name-div col-6 left',
    });
    titleNameDiv.append(recipeNameLabel, recipeAuthorLabel, favCountLabel);

    // appends the image, recipe name and author name to the recipe div for each of the recipes
    recipeDivRow2.append(likeButton);
    recipeDivRow1.append(imageDiv, titleNameDiv, recipeDivRow2);

    recipeDiv.append(recipeDivRow1);
    startRecipes.append(recipeDiv);
  });
};

const pageLoad = () => {
  $.ajax({
    method: 'GET',
    url: '/api/recent',
  }).then((response) => {
    console.log(response);
    $('.search-header').text('Recently Submitted Recipes');
    createRecipes(response);
  });
};

const categorySearch = (searchedCategory) => {
  $.ajax({
    method: 'GET',
    url: `/api/category/${searchedCategory}`,
  }).then((response) => {
    console.log('after category search', response);
    startRecipes.empty();
    createRecipes(response);
  });
};

const restrictionSearch = (searchedRestriction) => {
  $.ajax({
    method: 'GET',
    url: `/api/restriction/${searchedRestriction}`,
  }).then((response) => {
    console.log('restriction search', response);
    startRecipes.empty();
    createRecipes(response);
  });
};
const ingredientSearch = (searchedIngredient) => {
  $.ajax({
    method: 'GET',
    url: `/api/ingredient/${searchedIngredient}`,
  }).then((response) => {
    console.log('ingredient search', response);
    startRecipes.empty();
    createRecipes(response);
  });
};

const categoryIngredient = (cat, ingred) => {
  $.ajax({
    method: 'GET',
    url: `/api/category/${cat}/ingredient/${ingred}`,
  }).then((response) => {
    console.log('category ingredient', response);
    startRecipes.empty();
    createRecipes(response);
  });
};

const categoryRestriction = (cate, rest) => {
  $.ajax({
    method: 'GET',
    url: `/api/category/${cate}/restriction/${rest}`,
  }).then((response) => {
    console.log('category restriction response', response);
    startRecipes.empty();
    createRecipes(response);
  });
};

const authorSearch = (searchedAuthor) => {
  $.ajax({
    method: 'GET',
    url: `/api/author/${searchedAuthor}`,
  }).then((response) => {
    console.log('author search', response);
    startRecipes.empty();
    createRecipes(response);
  });
};

$('.search-btn').on('click', (event) => {
  event.preventDefault();
  if (selection === 'category') {
    category = $('#category-select').val();
    console.log(category);
    $('.search-header').text(`${category} Recipes`);
    categorySearch(category);
    $('#category-select').val('select');
  } else if (selection === 'author') {
    author = $('.auth-input').val();
    console.log(author);
    $('.search-header').text(`Recipes By ${author}`);
    authorSearch(author);
    $('.auth-input').val('');
    console.log(author, 'after search');
  } else if (selection === 'ingredient') {
    ingredient = $('.ingred-input').val();
    console.log(ingredient);
    $('.search-header').text(`Recipes That Include ${ingredient}`);
    ingredientSearch(ingredient);
    $('.ingred-input').val('');
  } else if (selection === 'restriction') {
    restriction = $('.diet-input').val();
    console.log(restriction);
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
    console.log('category, restriction', category, restriction);
    $('.search-header').text(`${restriction} ${category} Recipes`);
    categoryRestriction(category, restriction);
    $('#category-select').val('select');
    $('.diet-input').val('select');
  }
});

$('.like-btn-index').on('click', (event) => {
  event.preventDefault();
  // $('.like-btn-index').removeClass('btn-outline-secondary').addClass('btn-secondary');
  // favorites += 1;
  // $('.like-btn-index').data('like', favorites);
  // console.log(favorites);
  // favObj = {
  //   favorites,
  // };
  // console.log(favObj);

  // $.ajax({
  //   method: 'PUT',
  //   url: `/api/view/favorites/${recipeID}`,
  //   data: favObj,
  // }).then(() => {
  //   window.location.reload();
  // });
});

pageLoad();
