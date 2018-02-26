// vrEnviroment
import {calculateAmount} from './calculateAmount';

const proxyurl = "https://cors-anywhere.herokuapp.com/";

export function vrEnviroment(data, allergies){
		console.log(data);
		console.log(allergies);

    calculateAmount(data);

		
		
		//let prodImage = document.createElement("img");
        //let aImage = document.createElement("a-image");
        let prodName = document.createElement("a-text");
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


        prodName.setAttribute("value", data.Artikelbenamning);
        var pos = "-4.5 5 -10";
        var prod_scale = "10 10 10"
        prodName.setAttribute("scale", prod_scale)
        prodName.setAttribute("position", pos);
        prodName.setAttribute("color", "black")
        //document.getElementById("aFrameAssets").appendChild(asset);
        //document.getElementById("aFrameAssets").appendChild(newAsset);
        //prodImage.setAttribute("id", "product_image");
        //prodImage.setAttribute("src", proxyurl + data.Bilder[0].Lank);
        //aImage.setAttribute("src", "#prod_image");
        //aImage.setAttribute("width", "500");
        //aImage.setAttribute("height", "500");
        appendAframeElements(allergies);
        setTimeout(() => {
          document.getElementById("aScenen").appendChild(prodName);
          //document.getElementById("aScenen").appendChild(aModel);
          //document.getElementById("aScenen").appendChild(aModel2);
          document.getElementById("aFrameView").setAttribute("style", "display:block;");
          
        
        }, 1000)
        
  }
  

function appendAframeElements (allergyArray){
  let assetsArray = allergyArray.map(x => getElementAsAnAsset(x)).filter(y => y !== null).map(z => document.getElementById("aFrameAssets").appendChild(z));
  allergyArray = allergyArray.map(x => getElementAsAModel(x)).filter(y => y !== null).map(z => document.getElementById("aScenen").appendChild(z));
  createBoxes(allergyArray);
  console.log(allergyArray);  

}

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
        var pos1 = "0 1.5 -4";
        aModel.setAttribute("position", pos1);
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
        var pos2 = "1 1.75 -3.5";
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




