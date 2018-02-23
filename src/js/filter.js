
export default function containingAlergy(j, s){
	let allergyFound = j.Allergener.filter(e => s.indexOf(e.Allergen) > -1).map(b => b.Allergen);
}





