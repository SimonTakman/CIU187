import fetchData from './apiFunctions';
import startScandit from './barcodeScanner';
import * as THREE from 'three';
import parseContent from './parseContent';
import {vrEnviroment, tjena} from './vrEnviroment';

export default function fetchProduct(gtin){
const proxyurl = "https://cors-anywhere.herokuapp.com/";
	
	document.getElementById("modal_close_btn").addEventListener("click", function(){
		document.getElementById("mainView").setAttribute("style", "display:block;");
	});
	document.getElementById("modal_enter_vr_btn").addEventListener("click", () => {
		vrEnviroment(retriveData, retriveAllergies);
	});

	//console.log(containingAlergy);
	var milk = document.getElementById("checkbox_milk");
	var meat = document.getElementById("checkbox_meat");
	var roag = document.getElementById("checkbox_roag");
	var peanuts = document.getElementById("checkbox_peanuts");
	var egg = document.getElementById("checkbox_egg");

	var allergyFilter = [
		{ "id": milk.checked, 
			"value": milk.value},
		{ "id": meat.checked, 
			"value": meat.value},
		{ "id": roag.checked,
			"value": roag.value},
		{ "id": peanuts.checked,
			"value": peanuts.value},
		{ "id": egg.checked,
			"value": egg.value}
	];

	var meatObject = ["nötköttsextrakt"];

	var retriveData;
	var retriveAllergies;


	let allAllergy = allergyFilter.filter(a => a.id === true).map(e => e.value);
	if( allAllergy.filter(a => a === "Kött").length > 0){
		allAllergy = allAllergy.concat(meatObject);
	}

	console.log(allAllergy)

	//let gtin = document.getElementById("input_test").value;
	fetchData(gtin).then(function(res){
	retriveData = res;
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
        
        var temp = parseContent(res);
        temp = temp.filter(a => allAllergy.indexOf(a) > -1);

        arr = arr.concat(temp);
        retriveAllergies = arr;

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

        //document.getElementById("aFrameAssets").appendChild(canvas);
        //document.getElementById("aScenen").appendChild(prodName);
        
        
        //startScandit();
      
      //console.log(document.getElementById("checkbox_milk").checked);
      //document.getElementById("alergy").innerHTML = "Contains Alergy: "+ "NO!";
      });
    }
	});

}
