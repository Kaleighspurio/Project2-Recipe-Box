/*$(document).ready(function () {
  $("search-button").click(function () {
    const test = $("#search-ingredient").val();
    console.log(test);
  });
}); */

$(document).ready(function(){
  $(".ingredient-button").click(function(){
    $.ajax({url: "api/main", success: function(result){
      $("#match-list").html(result)
    }});
  });
});

$.ajax({
  method: 'GET',
  url: '/api/main',
}).then((response) => {
  console.log(response);
  
//click handler
$(".ingredient-button").on("click",(event) => {
  event.preventDefault();
  clear();

  $.ajax({
    url: 'api/main',
    method: "GET"
  }).then(updatePage);
});

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);    

/* $.get('api/main').then () => (response) {
      console.log(response);
    };

    displayMatches = () => {

    }

    searchRecipes = () => {
      
      var queryURL = "api/main";
      
      queryParams.q = $("#search-term")
        .val()
        .trim();
    
      
