//TODO: Add some functions here in order to create the AR-stuff

export default function fetchData(gtin) {
  // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "http://api.dabas.com/DABASService/V2/article/gtin/0" + gtin + "/JSON?apikey=e8c1e5fe-3fa1-4d02-bfdc-b0f28a8690db";
  return fetch(proxyurl + url).then(response => response.json()).catch(() => console.log("Error with" + url))

}



