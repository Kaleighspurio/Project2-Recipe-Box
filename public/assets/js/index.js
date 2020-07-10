const startRecipes = $('.on-load-recipes');
let category;
let ingredient;
let author;
let searchChoice;
let selection;
let restriction;

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
    const recipeName = recipe.recipe_name;
    let imageFilePath = recipe.image;
    const recipeID = recipe.id;
    const recipeAuthor = recipe.Author.name;
    if (imageFilePath === null) {
      imageFilePath = './assets/images/uploads/plate.png';
    }
    $('.search-header').text('Recently Submitted Recipes');
    // creates a div for each reciepe to go in
    const recipeDiv = $('<div>', {
      class: 'recipe-div rounded center',
      width: '200px',
    });
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
      src: imageFilePath,
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
    // creates a p for the author name for each of the recipes
    const recipeAuthorLabel = $('<p>', {
      class: 'center',
      'data-id': recipeID,
    }).text(`Author: ${recipeAuthor}`);
    // appends the image, recipe name and author name to the recipe div for each of the recipes
    recipeDiv.append(
      recipeImgElement,
      lineBreak,
      recipeNameLabel,
      recipeAuthorLabel,
      likeButton

    );
    startRecipes.append(recipeDiv);
  });
};

const pageLoad = () => {
  $.ajax({
    method: 'GET',
    url: '/api/recent',
  }).then((response) => {
    console.log(response);
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
    console.log('category restriction', response);
    startRecipes.empty();
    createRecipes(response);
  });
};

const authorSearch = (searchedAuthor) => {
  $.ajax({
    method: 'GET',
    url: `/api/author/${searchedAuthor}`,
  }).then((response) => {
    console.log('ingredient search', response);
    startRecipes.empty();
    createRecipes(response);
  });
};

$('.search-btn').on('click', (event) => {
  event.preventDefault();
  if (selection === 'category') {
    category = $('#category-select').val();
    console.log(category);
    categorySearch(category);
  } else if (selection === 'author') {
    author = $('.auth-input').val();
    console.log(author);
    authorSearch(author);
  } else if (selection === 'ingredient') {
    ingredient = $('.ingred-input').val();
    console.log(ingredient);
    ingredientSearch(ingredient);
  } else if (selection === 'restriction') {
    restriction = $('.diet-input').val();
    console.log(restriction);
    restrictionSearch(restriction);
  } else if (selection === 'cat-ing') {
    category = $('#category-select').val();
    ingredient = $('.ingred-input').val();
    categoryIngredient(category, ingredient);
  } else if (selection === 'cat-res') {
    category = $('#category-select').val();
    restriction = $('.diet-input').val();
    categoryRestriction(category, restriction);
  }
});

// $('.cat-search').on('click', (event) => {
//   event.preventDefault();
//   category = $('#category-select').val();
//   console.log(category);
//   categorySearch(category);
// });

// $('.ingred-search').on('click', (event) => {
//   event.preventDefault();
//   ingredient = $('.ingred-input').val();
//   console.log(ingredient);
//   ingredientSearch(ingredient);
// });

// $('.author-search').on('click', (event) => {
//   event.preventDefault();
//   author = $('.auth-input').val();
//   console.log(author);
//   authorSearch(author);
// });

pageLoad();
