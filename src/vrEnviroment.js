// vrEnviroment
import {calculateAmount} from './calculateAmount';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
var dataObject;
var allergiesObject;

var xPos = 0;
var zPos = 4;

export function vrEnviroment(data, allergies){
		console.log(data);
		console.log(allergies);

    //calculateAmount(data);

    dataObject = data;
    allergiesObject = allergies;

		
		
		//let prodImage = document.createElement("img");
        //let aImage = document.createElement("a-image");
        
        /*
        let asset = document.createElement("a-asset-item");
        let newAsset = document.createElement("a-asset-item");
        newAsset.setAttribute("id", "model_egg");
        asset.setAttribute("id","model_cow");
        let url2 = proxyurl + "http://florianwachter.com/dev/dataviz/models/untiene-egg-model.dae";
        newAsset.setAttribute("src", url2); 
        let url = proxyurl + "http://florianwachter.com/dev/dataviz/models/cow.dae";
        asset.setAttribute("src", url);
        let aModel = document.createElement("a-collada-model");
        aModel.setAttribute("src", "#model_cow");
        let aModel2 = document.createElement("a-collada-model");
        aModel2.setAttribute("src", "#model_egg");
        */
        //TODO: Have some issues with utf-8
        
        //var loader = new THREE.ImageLoader();
        //let canvas;
        //loader.load(
          //proxyurl + data.Bilder[0].Lank,
          //function (image){
            /*
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
        )*/
        //document.getElementById("aFrameAssets").appendChild(asset);
        //document.getElementById("aFrameAssets").appendChild(newAsset);
        //prodImage.setAttribute("id", "product_image");
        //prodImage.setAttribute("src", proxyurl + data.Bilder[0].Lank);
        //aImage.setAttribute("src", "#prod_image");
        //aImage.setAttribute("width", "500");
        //aImage.setAttribute("height", "500");
        appendAframeElements(allergies, data);
        setTimeout(() => {
          //document.getElementById("aScenen").appendChild(aModel);
          //document.getElementById("aScenen").appendChild(aModel2);
          document.getElementById("aFrameView").setAttribute("style", "display:block;");
          
        
        }, 1000)
        
  }
  

function appendAframeElements (allergyArray, data){
  let assetsArray = allergyArray.map(x => getElementAsAnAsset(x)).filter(y => y !== null).map(z => document.getElementById("aFrameAssets").appendChild(z));
  allergyArray = allergyArray.map(x => getElementAsAModel(x)).filter(y => y !== null).map(z => document.getElementById("aScenen").appendChild(z));
  createBoxes(allergyArray);
  generateInfoText(allergyArray); 
  generateHeader();
  if(data.Naringsinfo[0].Naringsvarden !== null){
    generateNutritionFacts(data.Naringsinfo[0].Naringsvarden);
  }
  generateHowToCook();  
  //createModelText(allergiesObject);

}

function generateHowToCook(){
  console.log(allergiesObject);
  if(allergiesObject.length === 0){

    let ht = document.createElement("a-plane");
    let tht = document.createElement("a-text");
    let tht_data = document.createElement("a-text");

    var ht_pos = "0 1.6 -4";

    ht.setAttribute("position", ht_pos);
    ht.setAttribute("rotation", "0 0 0");
    ht.setAttribute("width", "4");
    ht.setAttribute("height", "2");
    ht.setAttribute("color", "black");

    var tht_pos = "-0.7 2.4 -3.99";

    tht.setAttribute("scale", "1 1 1")
    tht.setAttribute("position", tht_pos);
    tht.setAttribute("color", "white");
    tht.setAttribute("value", "How to cook");

    var tht_pos_data = "-1.5 1.5 -3.99";

    tht_data.setAttribute("scale", "0.75 0.75 0.75")
    tht_data.setAttribute("position", tht_pos_data);
    tht_data.setAttribute("color", "white");
    console.log(dataObject)
    //console.log(dataObject.Tillagningsinformation.length)

    if(dataObject.Tillagningsinformation.length !== 0){
      console.log(dataObject.Tillagningsinformation[0].Anvisning)
      if(dataObject.Tillagningsinformation[0].Anvisning !== null){
        tht_data.setAttribute("value", dataObject.Tillagningsinformation[0].Anvisning);
      }else{
        tht_data.setAttribute("value", "No data found on how to cook")
      }
    }else{
      tht_data.setAttribute("value", "No data found on how to cook");
    }
    document.getElementById("aScenen").appendChild(ht);
    document.getElementById("aScenen").appendChild(tht);
    document.getElementById("aScenen").appendChild(tht_data);
  }
  


  //position="0 0.5 0" rotation="-90 0 0" width="11" height="11" color="#7BC8A4" shadow
}

function generateNutritionFacts(data){
  console.log(data);
  let protein = data.filter(x => x.Kod === "PRO-");
  console.log(protein);
  let carbs = data.filter(x => x.Kod === "CHOAVL");
  let fat = data.filter(x => x.Kod === "FAT");
  if(protein.length > 0 && carbs.length > 0 && fat.length > 0){
    let gymIndex = protein[0].Mangd / (carbs[0].Mangd + fat[0].Mangd);
    console.log(gymIndex);
    let gymCylinder = document.createElement("a-cylinder");
    let yVal = (gymIndex*20);
    let pos = "4.4 " + yVal/2 + " 0"
    gymCylinder.setAttribute("position", pos);
    gymCylinder.setAttribute("radius", "0.5");
    gymCylinder.setAttribute("height", yVal);
    gymCylinder.setAttribute("color", "#0000FF");
    document.getElementById("aScenen").appendChild(gymCylinder);
    let gymText = document.createElement("a-text");
    let gymTextValue = "Gym Value:\n" + gymIndex;
    gymText.setAttribute("value", gymTextValue);
    let gymText_pos = "4.4 1 1";
    //let gymText_scale = "3 3 3"
    //gymText.setAttribute("scale", gymText_scale)
    gymText.setAttribute("position", gymText_pos);
    gymText.setAttribute("rotation", "0 270 1");
    gymText.setAttribute("color", "red");
    document.getElementById("aScenen").appendChild(gymText);
  }
}

function generateInfoText(el){
  if(el.length === 0){
    let infoText = document.createElement("a-text");
    infoText.setAttribute("value", "This product will be safe to eat!");
    var infoText_pos = "-5 5 -10";
    var infoText_scale = "3 3 3"
    infoText.setAttribute("scale", infoText_scale)
    infoText.setAttribute("position", infoText_pos);
    infoText.setAttribute("color", "green");
    document.getElementById("aScenen").appendChild(infoText);
  }else{
    let infoText = document.createElement("a-text");
    infoText.setAttribute("value", "This product will not be safe to eat!");
    var infoText_pos = "-5 5 -10";
    var infoText_scale = "3 3 3"
    infoText.setAttribute("scale", infoText_scale)
    infoText.setAttribute("position", infoText_pos);
    infoText.setAttribute("color", "red");
    document.getElementById("aScenen").appendChild(infoText);
  }; 
};

function generateHeader(){
  let prodName = document.createElement("a-text");
  prodName.setAttribute("value", dataObject.Varumarke.Varumarke + ": " + dataObject.Artikelbenamning);
  var pos = "-9 8 -10";
  var prod_scale = "10 10 10"
  prodName.setAttribute("scale", prod_scale)
  prodName.setAttribute("position", pos);
  prodName.setAttribute("color", "black");
  document.getElementById("aScenen").appendChild(prodName);
};

function createModelText(el){
  if(el.length !== 0){
    for(var i = 0; i < el.length; i++){
      let modelText = document.createElement("a-text");
      var z = 3 - i;
      var mt_pos = i + " 1.5 -" + z;
      modelText.setAttribute("value", el[i]);
      modelText.setAttribute("position", mt_pos);
      modelText.setAttribute("color", "black");
      document.getElementById("aScenen").appendChild(modelText);

    }
  }
};

function getElementAsAnAsset (allergyItem){
  let aAssetItem;
  let url;
  switch (allergyItem) {
    case "Mjölk":
      /*aAssetItem = document.createElement("a-asset-item");
      aAssetItem.setAttribute("id", "milk");
      url = proxyurl + ""; //TODO: Insert links to florianwacther. 
      aAssetItem.setAttribute("src", url);
      return aAssetItem;
      // Append the entire element here*/
      break;
    case "Kött":
    case "nötköttsextrakt":
      aAssetItem = document.createElement("a-asset-item");
      aAssetItem.setAttribute("id", "meat");
      url = proxyurl + "http://florianwachter.com/dev/dataviz/models/cow.dae";
      aAssetItem.setAttribute("src", url);
      return aAssetItem;
      break;
    case "Råg":
      /*aAssetItem = document.createElement("a-asset-item");
      aAssetItem.setAttribute("id", "wheat");
      url = proxyurl + ""; //TODO: Insert links to florianwacther. 
      aAssetItem.setAttribute("src", url);
      return aAssetItem;*/
      break;
    case "Jordnötter ":
      aAssetItem = document.createElement("a-asset-item");
      aAssetItem.setAttribute("id", "peanuts");
      url = proxyurl + "http://florianwachter.com/dev/dataviz/models/big_nuts.dae"; //TODO: Insert links to florianwacther. 
      aAssetItem.setAttribute("src", url);
      return aAssetItem;
      break;
    case "Ägg":
      aAssetItem = document.createElement("a-asset-item");
      aAssetItem.setAttribute("id", "egg");
      url = proxyurl + "http://florianwachter.com/dev/dataviz/models/untiene-egg-model.dae"; 
      aAssetItem.setAttribute("src", url);
      return aAssetItem;
      break;
    default:
      // Do not do anything
      break;
  }
  return;
}

function getElementAsAModel(allergyItem){
  switch (allergyItem) {
    case "Mjölk":
      //document.createElement("")
      // Append the entire element here
      break;
    case "Kött":
    case "nötköttsextrakt":
        let animation = document.createElement("a-animation");
        animation.setAttribute("atribute", "rotation");
        animation.setAttribute("dur", "3000");
        var ani = "0 360 0"
        animation.setAttribute("to", ani);
        animation.setAttribute("repeat", "indefinite");
        animation.setAttribute("easing", "linear");
        let aModel = document.createElement("a-collada-model");
        aModel.setAttribute("src", "#meat");
        //var pos1 = "0 1.5 -4";
        var pos1 = xPos + " 1.5 " + "-" + zPos;
        aModel.setAttribute("position", pos1);
        xPos = xPos +1;
        zPos = zPos - 0.5;
        var scl1 = "0.1 0.1 0.1";
        aModel.setAttribute("scale", scl1);
        aModel.appendChild(animation);
        return aModel;
      break;
    case "Råg":
      // Append the entire element here
      break;
    case "Jordnötter ":
      let animation3 = document.createElement("a-animation");
        animation3.setAttribute("atribute", "rotation");
        animation3.setAttribute("dur", "3000");
        var ani3 = "0 360 0"
        animation3.setAttribute("to", ani3);
        animation3.setAttribute("repeat", "indefinite");
        animation3.setAttribute("easing", "linear");
        let aModel3 = document.createElement("a-collada-model");
        aModel3.setAttribute("src", "#peanuts");
        var pos3 = "0 1.75 -4";
        aModel3.setAttribute("position", pos3);
        var scl3 = "0.05 0.05 0.05";
        aModel3.setAttribute("scale", scl3);
        aModel3.appendChild(animation3);
        return aModel3;
      break;
    case "Ägg":
      let animation2 = document.createElement("a-animation");
        animation2.setAttribute("atribute", "rotation");
        animation2.setAttribute("dur", "3000");
        var ani2 = "360 360 360"
        animation2.setAttribute("to", ani2);
        animation2.setAttribute("repeat", "indefinite");
        animation2.setAttribute("easing", "linear");
        let aModel2 = document.createElement("a-collada-model");
        aModel2.setAttribute("src", "#egg");
        var pos2 = xPos + " 1.75 " + "-" + zPos;
        xPos = xPos + 1;
        zPos = zPos - 0.5;
        aModel2.setAttribute("position", pos2);
        var scl2 = "0.2 0.2 0.2";
        aModel2.setAttribute("scale", scl2);
        aModel2.appendChild(animation2);
        return aModel2;
      break;
    default:
      // Do not do anything
      break;
  }
  return;
}
function createBoxes(objectList){
  for(var i = 0; i < objectList.length; i++){
    let circle = document.createElement("a-cylinder");
    
    var z = 4 - (i * 0.5);
    var c_pos = i + " 0.5 -" + z;
    circle.setAttribute("position", c_pos);
    circle.setAttribute("radius", "0.5");
    circle.setAttribute("height", "1.5");
    circle.setAttribute("color", "#FF0000");
    document.getElementById("aScenen").appendChild(circle);
    //position="0 0.5 -4" radius="0.5" height="1.5" color="#FFC65D" shadow
  }
}




