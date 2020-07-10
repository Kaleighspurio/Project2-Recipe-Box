const startRecipes = $('.on-load-recipes');
let category;
let ingredient;
let author;

// $('.category-input').addClass('hide');
// $('.ingredient-input').addClass('hide');
// $('.author-input').addClass('hide');

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

$('.cat-search').on('click', (event) => {
  event.preventDefault();
  category = $('#category-select').val();
  console.log(category);
  categorySearch(category);
});

$('.ingred-search').on('click', (event) => {
  event.preventDefault();
  ingredient = $('.ingred-input').val();
  console.log(ingredient);
  ingredientSearch(ingredient);
});

$('.author-search').on('click', (event) => {
  event.preventDefault();
  author = $('.auth-input').val();
  console.log(author);
  authorSearch(author);
});

pageLoad();
