//import sayHello from './hello';

/*
 In order to reach functions in other classes, import them as below.
 Take a look at d3 if you want to load multiple functions into a variable. 
 */
import './index.scss';
import startQuagga from './quaggaFunctions';
import generateRandomD3Chart from './d3Functions';
import fetchData from './apiFunctions';
//import parser from 'xml2json';
//document.getElementById('root').innerHTML =generateRandomD3Chart();

//generateRandomD3Chart();

//fetchData("05701211012923");



var product_name = "no product name";
var product_url = "no product url";
var product_nutFact = "no product nut facts";

document.getElementById("submitBtn").addEventListener("click", fetchProduct);

function fetchProduct(){

	let gtin = document.getElementById("input_test").value;
	fetchData(gtin).then(function(res){
		console.log(res);
		document.getElementById("product_title").innerHTML = "Title: " + res.Artikelbenamning;
		document.getElementById("product_image_url").innerHTML = "URL: " + res.Bilder[0].Lank;
		document.getElementById("nutri_fact").innerHTML = "Nutrision facts: " + res.Ingrediensforteckning;
	});
}

//console.log(product);



