// calculateAmount
import parseContent from './parseContent';

export function calculateAmount (data, ){
	var packageSize = data.Nettoinnehall[0].Mängd;
	console.log(packageSize);

	var include = parseContent(data);
	console.log(include);



}

//Förpackningsstorlek