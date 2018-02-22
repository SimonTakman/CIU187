// apiTest.js 

var gtin_test = 8888;
var product_name = "no product name";
var product_url = "no product url";
var product_nutFact = "no product nut facts";

function getFetch(gtin){
	if(gtin === gtin_test){
		return { "product_name": "Coffe", "URL": "www.YEYE.se", "nut_fact": "282c" }
	} else {
		console.log("Wrong test gtin!")
	}
};

function getProduct(){

		var gtin = document.getElementById("input_test").value;
		var product = getFetch(gtin);
		console.log(product);
		document.getElementById("product_title").innerHTML = "Title: " + product.product_name;
		document.getElementById("product_image_url").innerHTML = "URL: " + product.product_url;
		document.getElementById("nutri_fact").innerHTML = "Nutrision facts: " + product. nut_fact;
}

