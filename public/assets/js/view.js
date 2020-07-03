const url = new URL(window.location);
const id = url.searchParams.get("id");

if(id){
    // search for the recipe 
    $.ajax({
        method: 'GET',
        url: `api/view/${id}`,
      }).then((response) => {
        console.log(response)
        //update placeholders
      });
}