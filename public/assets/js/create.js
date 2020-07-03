// const loadFile = (event) => {
//   const image = document.getElementById('output');
//   image.src = URL.createObjectURL(event.target.files[0]);
// };
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

  $('#submit-btn').on('click', (event) => {
    // if(author.val() === ''){
    // }
    event.preventDefault();
    createObject = {
      name: author.val().trim(),
      recipe_name: recipeName.val().trim(),
      category: category.val(),
      dietary_restriction: restrictions.val(),
      serving_size: size.val().trim(),
      url_source: url.val(),
      ingredient_name: ingredients.val().trim().split('\n'),
      instructions: instructions.val(),
    };
    console.log(createObject);
    postRecipe(createObject);
  });
});
