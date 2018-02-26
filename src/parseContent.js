// parseContent

export default function parseContent(productJSON) {
	var temp = productJSON.Ingrediensforteckning.split(", ");
	var b = temp.map(a => a.replace('.', ''));
	console.log(b);
	return b;

}