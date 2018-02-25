import fetchData from './apiFunctions';

export default function fetchProduct(gtin){
console.log("here i am");
	//console.log(containingAlergy);
	var milk = document.getElementById("checkbox_milk");
	var meat = document.getElementById("checkbox_meat");
	var roag = document.getElementById("checkbox_roag");

	var allergyFilter = [
		{ "id": milk.checked, 
			"value": milk.value},
		{ "id": meat.checked, 
			"value": meat.value},
		{ "id": roag.checked,
			"value": roag.value}
	];


	let allAllergy = allergyFilter.filter(a => a.id === true).map(e => e.value);

	console.log(allAllergy)

	//let gtin = document.getElementById("input_test").value;
	fetchData(gtin).then(function(res){
		console.log(res.Allergener)
		console.log(document.getElementById("checkbox_milk").checked);

		var p = new Promise(function(resolve, reject) {
			setTimeout(() => resolve(4), 1000);
		});

		p.then(() => res.Allergener.filter(e => allAllergy.indexOf(e.Allergen) > -1).map(b => b.Allergen)).then(arr => {
			console.log(arr)

			if(arr.length === 0){
				document.getElementById("alergy").innerHTML = "Contains Alergy: "+ "NO!";
			}else{
				document.getElementById("alergy").innerHTML = "Contains Alergy: "+ "YES! " + arr.toString();
			}

			document.getElementById("product_title").innerHTML = "Title: " + res.Artikelbenamning;
			document.getElementById("product_image_url").innerHTML = "URL: " + res.Bilder[0].Lank;
			document.getElementById("nutri_fact").innerHTML = "Nutrision facts: " + res.Ingrediensforteckning;
		
		//console.log(document.getElementById("checkbox_milk").checked);
		//document.getElementById("alergy").innerHTML = "Contains Alergy: "+ "NO!";
		});
	});
}
