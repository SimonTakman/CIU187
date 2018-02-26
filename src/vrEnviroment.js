// vrEnviroment

export function vrEnviroment(data, allergies){
		console.log(data);
		console.log(allergies);

		const proxyurl = "https://cors-anywhere.herokuapp.com/";
		
		//let prodImage = document.createElement("img");
        //let aImage = document.createElement("a-image");
        let prodName = document.createElement("a-text");
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
        //prodImage.setAttribute("id", "product_image");
        //prodImage.setAttribute("src", proxyurl + data.Bilder[0].Lank);
        //aImage.setAttribute("src", "#prod_image");
        //aImage.setAttribute("width", "500");
        //aImage.setAttribute("height", "500");
        setTimeout(() => {
          document.getElementById("aScenen").appendChild(prodName);
          document.getElementById("aFrameView").setAttribute("style", "display:block;");
          
        
        }, 1000)
        
	}
