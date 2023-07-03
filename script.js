const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipieContainer = document.querySelector('.recipie-container');
const recipieDetailsContent = document.querySelector('.recipie-details-content');
const recipieCloseBtn = document.querySelector('.recipie-close-btn');


const fetchRecipies =async (query) =>{
    recipieContainer.innerHTML = "<h2>Fetchingh Recipes...<h2>";

    try{
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    // console.log(response.meals[0]);

    recipieContainer.innerHTML = "";
    response.meals.forEach(meal =>{
        // console.log(meal);
        const recipieDiv = document.createElement('div');
        recipieDiv.classList.add('recipie');
        recipieDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `

        const button = document.createElement('button');
        button.textContent = "View Recipie";
        recipieDiv.appendChild(button);

        button.addEventListener('click', ()=>{
            openRecipiePopup(meal);
        })

        recipieContainer.appendChild(recipieDiv);

    });
}
catch(error)
{
    recipieContainer.innerHTML=`<h2>Error in Fetching Recipie`
}
}
const fetchIngredients = (meal) =>{
    let ingredientsList ="";
    for(let i=1; i<20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure}${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipiePopup =(meal) =>{
    recipieDetailsContent.innerHTML = `
    <h2 class="recipieName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipieInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    recipieDetailsContent.parentElement.style.display="block";

}

recipieCloseBtn.addEventListener('click', ()=>{
    recipieDetailsContent.parentElement.style.display="none";
})
searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();

    if(!searchInput){
        recipieContainer.innerHTML=`<h2>Type the meal in the search box</h2>`;
        return;
    }
    fetchRecipies(searchInput);
    // console.log("button clicked");
});

