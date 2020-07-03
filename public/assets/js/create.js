$(document).ready(() => {
  const author = $('#author-name');
  const recipeName = $('#recipe-name');
  const category = $('#category');
  const restrictions = $('#restrictions');
  const size = $('#serving-size');
  const url = $('#url');
  const ingredients = $('#ingredients');
  const instructions = $('#instructions');
  //   const file = $('#file');
  let createObject;

  const postRecipe = (recipe) => {
    $.ajax({
      method: 'POST',
      url: 'api/create',
      data: recipe,
    }).then((response) => {
      console.log('posted createObject');
      console.log(response);
      window.location.href = `/view/${response.id}`;
    });
  };

  $('#file').change((event) => {
    const image = $('<img>', {
      src: URL.createObjectURL(event.target.files[0]),
      id: 'output',
      width: '200',
    });
    $('image-div').append(image);
  });

  $('.close').on('click', () => {
    $('.toast').toast('hide');
  });

  $('#submit-btn').on('click', (event) => {
    event.preventDefault();

    createObject = {
      name: author.val().trim(),
      recipe_name: recipeName.val().trim(),
      category: category.val(),
      instructions: instructions.val(),
      ingredient_name: ingredients.val().trim().split('\n'),
      dietary_restriction: restrictions.val(),
      serving_size: size.val().trim(),
      url_source: url.val(),
    };

    const values = Object.values(createObject);
    const requiredValues = values.slice(0, 4);
    requiredValues.push(ingredients.val().trim());
    console.log(requiredValues);

    if (requiredValues.includes('')) {
      $('.toast-body').text('Missing required fields');
      $('.toast').toast('show');
      console.log('recipe failed to create');
      author.addClass('red-border');
      recipeName.addClass('red-border');
      instructions.addClass('red-border');
      ingredients.addClass('red-border');
      category.addClass('red-border');
      return;
    }

    postRecipe(createObject);
    console.log('recipe created');
  });
});
