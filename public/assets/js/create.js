$(document).ready(() => {
  const author = $('#author-name');
  const recipeName = $('#recipe-name');
  const category = $('#category');
  const restrictions = $('#restrictions');
  const size = $('#serving-size');
  const url = $('#url');
  const ingredients = $('#ingredients');
  const instructions = $('#instructions');
  const files = $('#file');
  const specialNotes = $('#special-notes');
  let createObject;

  const postRecipe = (recipe) => {
    // post reqest to the backend to store the recipe in the db
    $.ajax({
      method: 'POST',
      url: 'api/create',
      data: recipe,
      processData: false,
      contentType: false,
    }).then((response) => {
      console.log('posted createObject');
      console.log(response);
      window.location.href = `/recipe?id=${response.id}`;
    });
  };

  $('#submit-btn').on('click', (event) => {
    event.preventDefault();
    const ingredientsArray = ingredients.val().trim().split('\n');
    console.log(ingredientsArray);

    console.log(files);

    const data = new FormData();
    console.log('before files', files[0].files[0]);

    if (files[0].files[0] === undefined) {
      data.append('image', './assets/public/images/uploads/plate.png');
    } else {
      data.append('image', files[0].files[0]);
    }
    data.append('recipe_name', recipeName.val().trim());
    data.append('category', category.val());
    data.append('instructions', recipeName.val());
    data.append('ingredient_name', ingredientsArray);
    data.append('dietary_restriction', restrictions.val());
    data.append('serving_size', size.val().trim());
    data.append('url_source', url.val());
    data.append('name', author.val().trim());
    data.append('special_notes', specialNotes.val().trim());

    console.log(files[0].files[0]);
    console.log(data.entries());
    console.log(ingredientsArray);
    console.log(specialNotes.val());

    // creates an object of the values to be stored in the db
    createObject = {
      name: author.val().trim(),
      recipe_name: recipeName.val().trim(),
      category: category.val(),
      instructions: instructions.val(),
      ingredient_name: ingredients.val().trim().split('\n'),
      dietary_restriction: restrictions.val(),
      serving_size: size.val().trim(),
      url_source: url.val(),
      image: files,
    };

    // creates a seperate array of the values that are required
    const values = Object.values(createObject);
    const requiredValues = values.slice(0, 4);
    requiredValues.push(ingredients.val().trim());
    console.log(requiredValues);

    // if the required fields are empty there will be not posting of data
    if (requiredValues.includes('')) {
      $('.toast-body').text('Missing required fields');
      $('.toast-top').removeClass('toast-no-height');
      $('.toast').toast('show');
      console.log('recipe failed to create');
      author.addClass('red-border');
      recipeName.addClass('red-border');
      instructions.addClass('red-border');
      ingredients.addClass('red-border');
      category.addClass('red-border');
      console.log(createObject);
      return;
    }


    // posts the recipe
    postRecipe(data);
    console.log('recipe created');
  });

  // click the close 'x' to close the toast
  $('.close').on('click', () => {
    $('.toast-top').addClass('toast-height');
    $('.toast').toast('hide');
  });
});
