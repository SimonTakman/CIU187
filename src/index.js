
//import sayHello from './hello';

/*
 In order to reach functions in other classes, import them as below.
 Take a look at d3 if you want to load multiple functions into a variable. 
 */
import './index.scss';
import startQuagga from './quaggaFunctions';
import generateRandomD3Chart from './d3Functions';
//import {fetchData, fetchProduct} from './apiFunctions';
import containingAlergy from './js/filter';
import startScandit from './barcodeScanner';
import fetchProduct from './displayDataFunctions'
//import parser from 'xml2json';
//document.getElementById('root').innerHTML =generateRandomD3Chart();

//generateRandomD3Chart();

//fetchData("05701211012923");


//startScandit();
document.getElementById("submitBtn").addEventListener("click", startScandit);
document.getElementById("submitBtn2").addEventListener("click", manualEnter);


function manualEnter(){
	fetchProduct(document.getElementById("manual input").value);
}

//File loader
//import model_cow from 'assets/images/ex-scann.jpg';


//file raw loader
//import m_cow from 'raw-loader!./assets/models/cow.dae';


/*

--> js-infovis
--> js-scanner
	


$('#model_cow').on('load', function(event) {
	console.log('model loaded.. ');
});




var product_name = "no product name";
var product_url = "no product url";
var product_nutFact = "no product nut facts";

//document.getElementById("checkbox_milk").addEventListener("click", onClick());

document.getElementById("submitBtn").addEventListener("click", fetchProduct);

function fetchProduct(){

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

	let gtin = document.getElementById("input_test").value;
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


*/

//console.log(product);