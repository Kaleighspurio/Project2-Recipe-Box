$(document).ready(() => {
  const url = new URL(window.location);
  const id = url.searchParams.get('id');

  let commentObj = {};
  let favorites;
  let favObj = {};

  if (id) {
    // make a get request to find the recipe by it's ID
    $.ajax({
      method: 'GET',
      url: `/api/view/${id}`,
    }).then((response) => {
      console.log(response);
      favorites = response.favorite_count;
      // dynamically create elements to hold the information
      const recipeDiv = $('<div>', {
        class: 'recipe-div-view',
      });

      // recipe name
      const recipeName = $('<h2>', {
        class: 'recipe-name',
      }).text(`${response.recipe_name}`);

      // author name
      const authorName = $('<p>', {
        class: 'author-name margin-bottom',
      }).text(`Author: ${response.Author.name}`);

      // instructions
      const instructions = $('<p>', {
        class: 'instructions align-left',
      }).text(`${response.instructions}`);

      // instruction label
      const instructionTitle = $('<p>', {
        class: 'instructions-title title align-left',
      }).text('Instructions:');

      // unordered list for ingredients
      const ingredientUL = $('<ul>', {
        class: 'ingredient-list-title align-left',
      });

      // ingreident title
      const ingredientTitle = $('<p>', {
        class: 'ingredient-title left title',
      }).text('Ingredients');

      // for each ingredient in the array that was passed from the backend
      // create a list element with that ingredient
      response.Ingredients.forEach((ingredient) => {
        const ingredients = $('<li>', {
          class: 'ingredient-list',
        }).text(`${ingredient.ingredient_name}`);
        // append those elements onto the ul
        ingredientUL.append(ingredients);
      });

      // if there is no image passed from the backend, use the placeholder image
      let recipeImage = response.image;
      if (recipeImage === null) {
        recipeImage = './assets/images/uploads/plate.png';
      }

      // image
      const recipeImgElement = $('<img>', {
        src: recipeImage,
        'data-id': id,
        width: '150px',
        class: 'recipe-fav image-margin',
      });
      // serving size
      const servingSize = $('<p>', {
        class: 'serving-size',
      }).text(`Serving Size: ${response.serving_size}`);

      // special notes
      const specialNotes = $('<p>', {
        class: 'special-notes align-left',
      }).text(`${response.special_notes}`);

      // special notes title
      const specialNotesTitle = $('<p>', {
        class: 'special-notes-title title align-left',
      }).text('Special Notes:');

      // category
      const category = $('<p>', {
        class: 'category margin-bottom',
      }).text(`Category: ${response.category}`);

      // create a div for the comment section
      const commentEl = $('<div>', {
        class: 'comment-el',
      });

      // comment title
      const commentLabel = $('<p>', {
        class: 'comment-label',
      }).text('Comments:');

      // append the label to the div
      commentEl.append(commentLabel);

      // for each comment
      response.Comments.forEach((comment) => {
        // make a p to hold the comment
        const commentMade = $('<p>', {
          class: 'comment-made',
          // add the text to the p
        }).text(`${comment.commenter_name} says: ${comment.comment} `);
        // append the comment to the div
        commentEl.append(commentMade);
      });

      // dietary restrictions
      const diet = $('<p>', {
        class: 'diet margin-bottom',
      }).text(`Dietary Restrictions: ${response.dietary_restriction}`);

      // number of likes
      const favCountEl = $('<p>', {
        class: 'favCountEl align-left',
      }).text(`Number of Likes: ${response.favorite_count}`);

      // if there is a URL it will go on the page
      let recipeURL;
      if (response.url_source !== '' && response.url_source !== null) {
        recipeURL = $('<p>', {
          class: 'url left',
        }).text(`URL: ${response.url_source}`);
      }

      // append all of those elements onto the page
      recipeDiv.append(
        recipeImgElement,
        recipeName,
        authorName,
        category,
        diet,
        servingSize,
        ingredientTitle,
        ingredientUL,
        instructionTitle,
        instructions,
        specialNotesTitle,
        specialNotes,
        favCountEl,
        recipeURL,

      );

      // prepend the recipeDiv so it will go above the buttons
      $('.recipe').prepend(recipeDiv);
      // append the comments so they will go below the buttons
      $('.recipe').append(commentEl);
    });
  }

  // create click event for add to favorites button
  $('.comment-btn').on('click', (event) => {
    event.preventDefault();
    // get the value of the comment
    const commentTxt = $('.comment-text').val();

    // get the value of the commenter's name
    const commentName = $('.comment-name').val();

    // if there are no comment or commenter name - do not continue
    if (!commentTxt || !commentName) {
      $('.comment-text').addClass('red-border');
      $('.comment-name').addClass('red-border');
      return;
    }

    // create an object to send to the backend
    commentObj = {
      commenter_name: commentName,
      comment: commentTxt,
    };
    console.log(commentObj);

    // make a post request to the backend
    $.ajax({
      method: 'POST',
      url: `/api/view/comment/${id}`,
      // send the obejct made
      data: commentObj,
    }).then(() => {
      console.log('Comment Submitted');
      // reload the page to show the changes
      window.location.reload();
    });
  });

  $('.like-btn').on('click', (event) => {
    event.preventDefault();
    // add a like to the favorite count
    favorites += 1;
    // put the like count on the like button as a data attribute
    $('.like-btn').data('like', favorites);

    // create the object to send to the backend
    favObj = {
      favorites,
    };

    // make put request to change the fav count
    $.ajax({
      method: 'PUT',
      url: `/api/view/favorites/${id}`,
      data: favObj,
    }).then(() => {
      // reload the page to see the changes
      window.location.reload();
    });
  });

  // click event for email modal:

  document.getElementById('email-btn').addEventListener('click', () => {
    document.querySelector('.bg-modal').style.display = 'flex';
  });

  // click event to close email modal
  document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.bg-modal').style.display = 'none';
  });
});

let url;
$('.email-submit').on('click', (e) => {
  e.preventDefault();
  const name = $('#name').val();
  const email = $('#email').val();
  url = window.location.href;
  console.log(url);
  const emailInfo = {
    name,
    email,
    recipe: url,
  };
  console.log(name, email);
  $.ajax({
    method: 'POST',
    url: '/api/view/send',
    data: emailInfo,
  }).then((res) => {
    if (res.success) {
      $('#email-form').css('display', 'none');
      $('#email-result').text('Success!');
    }
    console.log('Email Send', res);
    // document.querySelector('.bg-modal').style.display = 'none';
    // alert('success')
  });
  // eslint-disable-next-line no-restricted-globals
  // location.reload();
});
