const input = document.querySelector(".input_meal")
const btn_search = document.querySelector(".btn-search")


btn_search.addEventListener("click", getMeal)

function getMeal(event) {
	event.preventDefault();
	input_value = input.value;
	document.getElementById("title").innerText = 'Công thức tìm kiếm từ :'+''+input.value;
	fetchDataAPI(input_value);
}

async function fetchDataAPI(input_value) {
	app_id = '24270fcf';
	app_key = '9c8b546d8fefe29384d4e2e11755885e';
	baseURI = `https://api.edamam.com/search?q=${input_value}&app_id=${app_id}&app_key=${app_key}&from=0&to=3&calories=591-722&health=alcohol-free`;
	result = await fetch(baseURI);
	recipes = await result.json();
	console.log(recipes);
	createHTML(recipes.hits);
}
function createHTML(data) {
	showHtml = '';
	data.map(result => {
		showHtml += `<li>
		<img width="100%" src="${result.recipe.image}">
		<p>Tên món ăn : <span>${result.recipe.label}</span></p>
		<p>Calories : <span>${result.recipe.calories.toFixed(2)}</span></p>
		<a href="${result.recipe.url}" 
		target="_blank" class="btn btn-sm btn-primary">Xem chi tiết</a>
		</li>`
	})
	document.querySelector(".li_recipe").innerHTML = showHtml;
}