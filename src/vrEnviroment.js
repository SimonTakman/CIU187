// vrEnviroment

export function vrEnviroment(data, allergies){
		console.log(data);
		console.log(allergies);

		const proxyurl = "https://cors-anywhere.herokuapp.com/";
		
		//let prodImage = document.createElement("img");
        //let aImage = document.createElement("a-image");
        let prodName = document.createElement("a-text");
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
        var pos = "0 1 0"
        prodName.setAttribute("position", pos);
        prodName.setAttribute("color", "black")
        document.getElementById("aFrameAssets").appendChild(asset);
        document.getElementById("aFrameAssets").appendChild(newAsset);
        //prodImage.setAttribute("id", "product_image");
        //prodImage.setAttribute("src", proxyurl + data.Bilder[0].Lank);
        //aImage.setAttribute("src", "#prod_image");
        //aImage.setAttribute("width", "500");
        //aImage.setAttribute("height", "500");
        setTimeout(() => {
          document.getElementById("aScenen").appendChild(prodName);
          document.getElementById("aScenen").appendChild(aModel);
          document.getElementById("aScenen").appendChild(aModel2);
          document.getElementById("aFrameView").setAttribute("style", "display:block;");
          
        
        }, 1000)
        
  }
  

function appendAframeElements (allergyArray){
  let assetsArray = allergyArray.map(x => getElementAsAnAsset(x));
  allergyArray = allergyArray.map(x => getElementAsAModel(x));
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
      /*aAssetItem = document.createElement("a-asset-item");
      aAssetItem.setAttribute("id", "meat");
      url = proxyurl + ""; //TODO: Insert links to florianwacther. 
      aAssetItem.setAttribute("src", url);
      return aAssetItem;*/
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
    case "Kött" | "nötköttsextrakt":
      // Append the entire element here
      break;
    case "Råg":
      // Append the entire element here
      break;
    case "Jordnötter ":
      // Append the entire element here
      break;
    case "Ägg":
      // Append the entire element here
      break;
    default:
      // Do not do anything
      break;
  }
  return;
}