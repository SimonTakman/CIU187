import fetchData from './apiFunctions';
import startScandit from './barcodeScanner';
import * as THREE from 'three';

export default function fetchProduct(gtin){
console.log("here i am");
const proxyurl = "https://cors-anywhere.herokuapp.com/";
	//console.log(containingAlergy);
	var milk = document.getElementById("checkbox_milk");
	var meat = document.getElementById("checkbox_meat");
	var roag = document.getElementById("checkbox_roag");
	var peanuts = document.getElementById("checkbox_peanuts");

	var allergyFilter = [
		{ "id": milk.checked, 
			"value": milk.value},
		{ "id": meat.checked, 
			"value": meat.value},
		{ "id": roag.checked,
			"value": roag.value},
		{ "id": peanuts.checked,
			"value": peanuts.value}
	];


	let allAllergy = allergyFilter.filter(a => a.id === true).map(e => e.value);

	console.log(allAllergy)

	//let gtin = document.getElementById("input_test").value;
	fetchData(gtin).then(function(res){
    if(!res.GTIN){
      var snackBar = document.createElement("div");
      snackBar.innerHTML = "The barcode "+ gtin + " does not exist in the database";
      snackBar.setAttribute("style", "visibility: hidden; min-width: 250px; margin-left: -125px; background-color: #333; color: #fff; text-align: center; border-radius: 2px; padding: 16px; position: fixed; z-index: 1; left: 50%; bottom: 30px; visibility: visible;");
      document.body.appendChild(snackBar);
      setTimeout( () => snackBar.setAttribute("style", "visibility: hidden;"), 3000);
    } else {
      console.log(res.Allergener)
      console.log(document.getElementById("checkbox_milk").checked);

      var p = new Promise(function(resolve, reject) {
        setTimeout(() => resolve(4), 1000);
      });

      p.then(() => res.Allergener.filter(e => allAllergy.indexOf(e.Allergen) > -1).map(b => b.Allergen)).then(arr => {
        console.log(arr)

        if(arr.length === 0){
          document.getElementById("alergy").innerHTML = "Contains Alergy: "+ "NO!";
          document.getElementById("alergy").setAttribute("style", 'color: green');
        }else{
          document.getElementById("alergy").innerHTML = "Contains Alergy: "+ "YES! " + arr.toString();
          document.getElementById("alergy").setAttribute("style", "color: red");
        }
        document.getElementById("product_title").innerHTML = "Title: " + res.Artikelbenamning;
        //Need to check if we have an image, otherwise it will not be able to this below.
        document.getElementById("product_image_url").innerHTML = "URL: " + res.Bilder[0].Lank;
        document.getElementById("nutri_fact").innerHTML = "Nutrition facts: " + res.Ingrediensforteckning;
        document.getElementById("mainView").setAttribute("style", "display:none;");

        //document.getElementById("myModal").modal("show");

        //console.log(document.getElementById("myModal").setAttribute('data-toggle', 'modal'));

        //document.getElementById("myModal").modal('show');
        $("#myModal").modal()

        let prodImage = document.createElement("img");
        let aImage = document.createElement("a-image");
        let prodName = document.createElement("a-text");
        //TODO: Have some issues with utf-8
        
        var loader = new THREE.ImageLoader();
        let canvas;
        loader.load(
          proxyurl + res.Bilder[0].Lank,
          function (image){
            canvas = document.createElement('canvas');
            canvas.setAttribute("width", "1000");
            canvas.setAttribute("height", "1000");
            canvas.setAttribute("id", "prod_image") 
            var context = canvas.getContext('2d');
            context.drawImage(image, 100, 100);
          },
          undefined,
          function (){
            console.error("An error happened");
          }
        )


        prodName.setAttribute("value", res.Artikelbenamning);
        prodImage.setAttribute("id", "product_image");
        prodImage.setAttribute("src", proxyurl + res.Bilder[0].Lank);
        aImage.setAttribute("src", "#prod_image");
        aImage.setAttribute("width", "500");
        aImage.setAttribute("height", "500");
        setTimeout(() => {
          document.getElementById("aScenen").appendChild(canvas);
          //document.getElementById("aFrameView").setAttribute("style", "display:block;");
          
        
        }, 1000)
        //document.getElementById("aFrameAssets").appendChild(canvas);
        //document.getElementById("aScenen").appendChild(prodName);
        
        
        //startScandit();
      
      //console.log(document.getElementById("checkbox_milk").checked);
      //document.getElementById("alergy").innerHTML = "Contains Alergy: "+ "NO!";
      });
    }
	});
}
