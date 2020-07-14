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
      console.log(response);
      // redirect the user to the views page to see their recipe
      // window.location.href = `/recipe?id=${response.id}`;
    });
  };

  $('#submit-btn').on('click', (event) => {
    event.preventDefault();

    // create an array with the data given for the ingredients
    const ingredientsArray = ingredients.val().trim().split('\n');

    // create a FormData to store in information to send to the backend
    const data = new FormData();

    // if no image is uploaded - use the placeholder image
    if (files[0].files[0] === undefined) {
      data.append('image', './assets/public/images/uploads/plate.png');
    } else {
      // append the image onto the FormData
      data.append('image', files[0].files[0]);
    }
    // append the recipe name onto the FormData
    data.append('recipe_name', recipeName.val().trim());
    // append the category onto the FormData
    data.append('category', category.val());
    // append the instructions onto the FormData
    data.append('instructions', instructions.val());
    // append the ingredients onto the FormData
    data.append('ingredient_name', ingredientsArray);
    // append the dietary restrictions onto the FormData
    data.append('dietary_restriction', restrictions.val());
    // append the servering size onto the FormData
    data.append('serving_size', size.val().trim());
    // append the url onto the FormData
    data.append('url_source', url.val());
    // append the author onto the FormData
    data.append('name', author.val().trim());
    // append the special notes onto the FormData
    data.append('special_notes', specialNotes.val().trim());

    // Take the name of the uploaded file and split it at the period to check what type it is
    const filename = files[0].files[0].name;
    const filetype = filename.split('.')[1];
    console.log(filetype);
    // if it is not jpg, png, or jpeg, do not allow submission/POST
    if (filetype !== 'jpg' && filetype !== 'png' && filetype !== 'jpeg') {
      console.log('That is not an acceptable file type');
      //  Make some sort of message pop up
      $('.toast-body').text('File must be jpg, png, or jpeg');
      $('.toast-top').removeClass('toast-no-height');
      $('.toast').toast('show');
      return;
    }

    // creates an object of the values to be used to check for the required fields
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

    // if the required fields are empty there will be not posting of data
    // the required fields input borders will turn red
    // a toast will appear with a message of missing required fields
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
      return;
    }

    // posts the recipe
    // postRecipe function called passing in the data from the form
    postRecipe(data);
    console.log('recipe created');
  });

  // click the close 'x' to close the toast
  $('.close').on('click', () => {
    $('.toast-top').addClass('toast-height');
    $('.toast').toast('hide');
  });
});
