let resultsRow = document.getElementById("resultsRow");
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let recipeDetailsDiv = document.getElementById("recipeDetailsDiv");
let allRecipes = [];

/*
let httpreq = new XMLHttpRequest;
httpreq.open("GET" , "https://forkify-api.herokuapp.com/api/search?&q=pizza");
httpreq.send();
httpreq.addEventListener("readystatechange" , function(){
    if(httpreq.readyState==4 && httpreq.status==200)
    {
        allRecipes = JSON.parse(httpreq.response).recipes
        console.log(allRecipes)
        displayRecipes();
    }
});
*/


async function getRecipes(term)
{
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
    apiResponse = await apiResponse.json();
    allRecipes = apiResponse.recipes;
    displayRecipes();
};
getRecipes('pizza');
function displayRecipes(){
    let cartoona=``;
    for (let i = 0; i < allRecipes.length; i++) 
    {
        let myId = "'"+allRecipes[i].recipe_id+"'";
        cartoona += `   <div class="col-md-4 py-3">
                            <div onclick="getDetails(${myId})" class="recipe p-2">
                                <img class="w-100 " src="${allRecipes[i].image_url}" alt="">
                                <h3 class="color-mine py-2 font-weight-bolder">${allRecipes[i].title}</h3>
                                <p class="text-muted font-weight-bolder">${allRecipes[i].publisher}</p>
                                <button class="btn btn-mine">
                                    <a class="text-white text-decoration-none" target="_blank" href="${allRecipes[i].source_url}"> show details</a>
                                </button>
                            </div>
                        </div>  `;
    }
    resultsRow.innerHTML = cartoona;
};

searchBtn.addEventListener("click" , function(){
    getRecipes(searchInput.value) 
})

async function getDetails(id)
{
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    apiResponse = await apiResponse.json();
    let recipeDetails = apiResponse.recipe;
    displayDetails(recipeDetails);
}
function displayDetails(recipeDetails)
{
    let cartoona = `<img class="w-100 " src="${recipeDetails.image_url}" alt="">
                    <h3 class="color-mine py-2 font-weight-bolder">${recipeDetails.title}</h3>
                    <p>ingredients:-</p>
                    <ul class="list-unstyled">`;
                    for (let i = 0; i < recipeDetails.ingredients.length; i++) {
                        cartoona += `<li class="font-weight-bold">${recipeDetails.ingredients[i]}</li>`;
                    }    
        cartoona += `</ul>`;
    recipeDetailsDiv.innerHTML = cartoona;
}