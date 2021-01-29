console.log("Hey from javascript");
const BASEURL = 'http://localhost:3001/';

//Api Calls and rendering

const GetRecipies = async () => {

    let element = document.querySelector('.container1');

    try {
        let response = await fetch(BASEURL + 'recipes')
        response = await response.json()
        console.log(response)
        let Markup = GetRecipesMarkup(response)
        element.insertAdjacentHTML('afterbegin', Markup)
        AddListeners(response, (data) => { GetRecipeDetails(data) })
    } catch (error) {
        console.log(error);
    }
}

const GetSpecials = async () => {

    try {
        let response = await fetch(BASEURL + 'specials')
        response = await response.json()
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}

const GetRecipeDetails = (data) => {

    let Details = document.querySelector(".container2")
    let Child = document.querySelector(".details")

    let Markup = GetDetailMarkup(data)

    console.log(Child)
    if (Child) {
        Child.remove()
    }
    Details.insertAdjacentHTML('afterbegin', Markup)

    //console.log(Markup)

}

const GetDetailMarkup = (data) => {
    return `
    <div class="details">
                <div class="detail-image">
                    <img src=${'/public' + data.images.full} />
                </div>
                <div class="detail-bar">
                    <span class="title-box">${data.title}</span>
                    <div class="recipe-detail-time">
                        <img class="time-icon" src="/public/icons/clock.svg" />
                        <span class="time">${data.cookTime} MINUTES</span>
                    </div>
                    <div class="recipe-detail-servings">
                        <img class="serving-icon" src="./public/icons/servings.svg" />
                        <span class="servings">${data.servings} PEOPLE</span>
                    </div>
                    <div class="recipe-detail-ingredients">
                        <img class="ingredients-icon" src="./public/icons/ingredients.svg" />
                        <span class="ingredient">${data.ingredients.length} INGREDIENTS</span>
                    </div>
                </div>
                <div class="ingredients-section">
                    <h3>RECIPE INGREDIENTS</h3>
                    <div class="ingredients-list">
                    ${data.ingredients.map(ingredient => {
        return `
                        <div class="ingredient-container">
                            <img class="ingredients-icon" src="/public/icons/tick.svg" />
                            <span class="ingredient-name">${ingredient.name}</span>
                        </div> 
                        `}).join('')}
                    </div>

                </div>
                <div class="directions-container">
                    <h3>HOW TO COOK IT</h3>
                    ${data.directions.map((direction, index) => {
            return `
                        <div class="direction-list">
                        <div class="direction-container">
                            <span class="step-name">${(index + 1) + '. ' + direction.instructions}</span>
                        </div>
                        </div> 
                        `}).join('')}
                </div>
            </div>
    `
}


//Markups for Rendering

const GetRecipesMarkup = (data) => {
    let Markup = data.map(item => {
        return `
        <div class="recipe" id=${'recipe' + item.uuid}>
        <div class="recipe-image">
            <img src="${'/public' + item.images.medium}" />
        </div>
        <div class="details-container">
            <span>${item.title}</span>
            <span>Servings - ${item.servings}</span>
        </div>
        </div>
        `
    }).join('');

    return Markup
}

const AddListeners = (data, callback) => {
    data.forEach((item, index) => {
        if (index == 0) {
            callback(item)
        }
        document.querySelector(`#${'recipe' + item.uuid}`).addEventListener("click", function () {
            console.log(item)
            callback(item)
        });
    })
}

GetRecipies();
GetSpecials();