import fetchData from './apiFunctions';
import startScandit from './barcodeScanner';

export default function fetchProduct(gtin){
console.log("here i am");
const proxyurl = "https://cors-anywhere.herokuapp.com/";
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
      //Need to check if we have an image, otherwise it will not be able to this below.
      document.getElementById("product_image_url").innerHTML = "URL: " + res.Bilder[0].Lank;
      document.getElementById("nutri_fact").innerHTML = "Nutrision facts: " + res.Ingrediensforteckning;
      document.getElementById("mainView").setAttribute("style", "display:none;");
      let prodImage = document.createElement("img");
      let aImage = document.createElement("a-plane");
      let prodName = document.createElement("a-text");
      //TODO: Have some issues with utf-8
      _tmpTex.generateMipmaps = false;
      _tmpTex.minFilter = THREE.LinearFilter;
      _tmpTex.magFilter = THREE.LinearFilter;
      prodName.setAttribute("value", res.Artikelbenamning);
      prodImage.setAttribute("id", "product_image");
      prodImage.setAttribute("src", proxyurl + res.Bilder[0].Lank);
      aImage.setAttribute("src", "product_image");
      aImage.setAttribute("width", "500");
      aImage.setAttribute("height", "500");
      document.getElementById("aFrameAssets").appendChild(prodImage);
      document.getElementById("aScenen").appendChild(prodName);
      setTimeout(() => {
        document.getElementById("aScenen").appendChild(aImage);
        document.getElementById("aFrameView").setAttribute("style", "display:block;");
      } ,1000);
      
      //startScandit();
		
		//console.log(document.getElementById("checkbox_milk").checked);
		//document.getElementById("alergy").innerHTML = "Contains Alergy: "+ "NO!";
		});
	});
}
