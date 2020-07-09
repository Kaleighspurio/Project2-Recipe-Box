const url = new URL(window.location);
const id = url.searchParams.get("id");

if (id) {
  // search for the recipe
  $.ajax({
    method: "GET",
    url: `/recipe?id=${recipeID}`,
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
    let recipeImage = recipe.image;
    if (recipeImage === null) {
      recipeImage = './assets/images/uploads/plate.png';
    }

  });
};



// create click event for add to favorites button
$(".add-favorite").on("click", (event) => {
  const addFavorite = () => {
  $.ajax({
    method: "POST",
    url: /api/favorites,
  }).then((response) => {
    console.log(response);}
// add JQyery here to appened Favorites page or copy Karen's function from Fav page?



// creat click event for email button
$(".email-recipe").on("click", (event) => {
  Const emailRecipe = () => {
//node mailer function call?
  }
};

addFavorite();
emailRecipe();
