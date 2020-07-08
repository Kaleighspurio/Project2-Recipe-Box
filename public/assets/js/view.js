const url = new URL(window.location);
const id = url.searchParams.get("id");

if (id) {
  // search for the recipe
  $.ajax({
    method: "GET",
    url: `api/view/${id}`,
  }).then((response) => {
    console.log(response);

    // update placeholder text in recipe card //
    $(".recipe-name").text("Recipe Title", `${recipe.recipe_name}`);
    $(".recipe-author").text("Recipe Author", `${recipe.Author.name}`);
    $(".recipe-instructions").text(
      "Recipe Instructions...",
      `${recipe.instructions}`
    );
    $(".recipe-link").text("Recipe link", `${recipe.link}`);


  });
}

// create click event for add to favorites button
$(".add-favorite").on("click", (event) => {
  addFavorite(recipe);}
// creat click event for email button
$(".email-recipe").on("click", (event) => {
  emailRecipe(recipe);}
