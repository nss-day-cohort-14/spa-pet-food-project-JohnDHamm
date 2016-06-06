var outputEl = document.getElementById("container");
currentAnimal = null;


function addItems () {
	var itemList = JSON.parse(event.target.responseText);
	console.log("itemList", itemList);

	// var typeFood = Object.getOwnPropertyNames(itemList);
	// console.log("typeFood", typeFood);
	outputEl.innerHTML += `<div id="typeFood">${currentAnimal} food</div>`

	if (currentAnimal === "dog") {
		var brandArray = itemList.dog_brands;
	} else if (currentAnimal === "cat") {
		var brandArray = itemList.cat_brands;
	};

	for (var i = 0; i <brandArray.length; i++) {		//brand loop
		var brandName = brandArray[i].name;
		// console.log("brand: ", brandName);
		var makeBrand = `<div class="brand"><h1 class="brandName">${brandName}</h1>`;

		if (currentAnimal === "cat") {
			var breedList = brandArray[i].breeds;
			makeBrand += `<h2 class="breed">For breeds: ${breedList}</h2>`;
		}

		var typeArray = brandArray[i].types;
		for (var j = 0; j < typeArray.length; j++) { 					//type loop
			var style = styleType(typeArray[j].type);
			// console.log("type: ", style);
			makeBrand += `<div class="type"><h3 class="typeName">${style}</h3>`;

			var volumesArray = typeArray[j].volumes;
			for (k = 0; k < volumesArray.length; k++) { 		//volume loop
				var size = volumesArray[k].name;
				// console.log("size: ", size);
				var price = volumesArray[k].price;
				// console.log("price: ", price);
				makeBrand += `<p class="size">${size}<span class="price">$ ${price}</span></p>`;
				makeBrand += ``;
			}  //end volume loop
		makeBrand += `</div>`;
		}  //end type loop
	makeBrand += `</div>`;
	outputEl.innerHTML += makeBrand;
	} //end brand loop
}


function addDogFood () {
	currentAnimal = "dog";
	addItems ();
}


function addCatFood () {
	currentAnimal = "cat";
	addItems ();
}

function styleType (word) {
	return word.replace("_", " ");
}


var newRequest = new XMLHttpRequest();
newRequest.addEventListener("load", addDogFood);
newRequest.open("GET", "dogfood.json");
newRequest.send();


var newRequestCat = new XMLHttpRequest();
newRequestCat.addEventListener("load", addCatFood);
newRequestCat.open("GET", "catfood.json");
newRequestCat.send();
