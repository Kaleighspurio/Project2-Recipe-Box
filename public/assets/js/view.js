$(document).ready(() => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");
  console.log(id);

  let commentObj = {};
  let favorites;
  let favObj = {};

  if (id) {
    // search for the recipe
    $.ajax({
      method: "GET",
      url: `/api/view/${id}`,
    }).then((response) => {
      console.log(response);
      favorites = response.favorite_count;
      const recipeName = $("<h2>", {
        class: "recipe-name",
      }).text(`${response.recipe_name}`);

      const authorName = $("<h3>", {
        class: "author-name",
      }).text(`Author: ${response.Author.name}`);

      const instructions = $("<p>", {
        class: "instructions",
      }).text(`Instructions: ${response.instructions}`);

      // const ingredientList = reponse.ingredients
      const ingredientTitle = $("<ul>").text("Ingredients:");

      response.Ingredients.forEach((ingredient) => {
        const ingredients = $("<li>", {
          class: "ingredient",
        }).text(`${ingredient.ingredient_name}`);
        ingredientTitle.append(ingredients);
      });

      let recipeImage = response.image;
      if (recipeImage === null) {
        recipeImage = "./assets/images/uploads/plate.png";
      }

      const servingSize = $("<p>", {
        class: "serving-size",
      }).text(`Serving Size: ${response.serving_size}`);

      const recipeImgElement = $("<img>", {
        src: recipeImage,
        "data-id": id,
        width: "150px",
        class: "recipe-fav image-margin",
      });

      const specialNotes = $("<p>", {
        class: "special-notes",
      }).text(`Special Notes: ${response.special_notes}`);

      const category = $("<p>", {
        class: "category",
      }).text(`Category: ${response.category}`);

      const commentEl = $("<div>");
      response.Comments.forEach((comment) => {
        const commentMade = $("<p>", {
          class: "comment-made",
        }).text(`${comment.commenter_name} says: ${comment.comment} `);
        commentEl.append(commentMade);
      });

      const diet = $("<p>", {
        class: "diet",
      }).text(`Dietary Restrictions: ${response.dietary_restrictions}`);

      const favCountEl = $("<p>", {
        class: "favCountEl",
      }).text(`Number of Likes: ${response.favorite_count}`);

      $(".recipe").prepend(
        recipeImgElement,
        recipeName,
        authorName,
        category,
        diet,
        servingSize,
        ingredientTitle,
        instructions,
        specialNotes,
        favCountEl
      );
      $(".comments-made").append(commentEl);
    });
  }

  // create click event for add to favorites button
  $(".comment-btn").on("click", (event) => {
    event.preventDefault();
    const commentTxt = $(".comment-text").val();
    console.log(commentTxt);
    const commentName = $(".comment-name").val();
    console.log(commentName);
    console.log(id);

    commentObj = {
      commenter_name: commentName,
      comment: commentTxt,
      // RecipeId: id,
    };
    console.log(commentObj);

    $.ajax({
      method: "POST",
      url: `/api/view/comment/${id}`,
      data: commentObj,
    }).then(() => {
      console.log("Comment Submitted");
      window.location.reload();
    });
  });

  $(".like-btn").on("click", (event) => {
    event.preventDefault();
    favorites += 1;
    $(".like-btn").data("like", favorites);
    console.log(favorites);
    favObj = {
      favorites,
    };
    console.log(favObj);

    $.ajax({
      method: "PUT",
      url: `/api/view/favorites/${id}`,
      data: favObj,
    }).then(() => {
      window.location.reload();
    });
  });

  // click event for email modal:

  document.getElementById("email-btn").addEventListener("click", function () {
    document.querySelector(".bg-modal").style.display = "flex";
  });

  // click event to close email modal

  document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".bg-modal").style.display = "none";
  });
});
